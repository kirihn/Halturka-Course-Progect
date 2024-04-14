import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    /* login, register, getNewToken */
    async Register(dto: RegisterDto){
        const OldUser = await this.prisma.user.findUnique({
            where:{
                Email: dto.Email
            }
        })        
        if(OldUser) throw new BadRequestException('Данный email уже занят') 

        const User = await this.prisma.user.create({
            data: {
                Email: dto.Email,
                Password: await hash(dto.Password),
                Role: dto.Role
            }
        })

        // add Customer or Handyman

        if(User.Role == 1){
            const OldCustomer = await this.prisma.customer.findUnique({
                where:{
                    UserId: User.Id
                }
            })        
            if(OldCustomer) throw new BadRequestException('Данный UserId уже занят') 

            await this.prisma.customer.create({
                data: {
                    user: {
                        connect: { Id: User.Id }
                    },
                    Name: dto.Name,
                    PhoneNumber: dto.PhoneNumber,
                    AvatarPath: dto.AvatarPath
                }
            })
        } 
        else if(User.Role == 2){
            const OldHandyMan = await this.prisma.customer.findUnique({
                where:{
                    UserId: User.Id
                }
            })        
            if(OldHandyMan) throw new BadRequestException('Данный UserId уже занят') 

            await this.prisma.handyMan.create({
                data: {
                    user: {
                        connect: { Id: User.Id }
                    },
                    Name: dto.Name,
                    PhoneNumber: dto.PhoneNumber,
                    AvatarPath: dto.AvatarPath
                }
            })
        }
        
        const tokens = await this.IssueTokens(User.Id)
        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }

    async GetNewTokens(refreshToken: string){
        const result = await this.jwt.verifyAsync(refreshToken);
        if(!result) throw new UnauthorizedException('Несоответствующий refresh token'); 

        const User = await this.prisma.user.findUnique({where: {Id : result.id}});

        const tokens = await this.IssueTokens(User.Id)

        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }

    async Login(dto: LoginDto){
        const User = await this.ValidateUser(dto);
        const tokens = await this.IssueTokens(User.Id);
        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }

    private async IssueTokens(userId: number){
        const data = {
            Id: userId
        }

        const AcssesToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        const RefreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return {AcssesToken, RefreshToken}
    }

    private ReturnUserFields(user: User){
        return {
            Id: user.Id,
            Email: user.Email
        }
    }

    private async ValidateUser(dto: LoginDto){
        const User = await this.prisma.user.findUnique( {
            where : {Email: dto.Email}
        })
        if(!User) throw new NotFoundException('Пользователь не найден');

        const IsValid = await verify(User.Password, dto.Password);
        if(!IsValid) throw new UnauthorizedException('Неверный пароль');

        return User;
    }
}
