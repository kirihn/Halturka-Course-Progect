"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const argon2_1 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async Register(dto) {
        const OldUser = await this.prisma.user.findUnique({
            where: {
                Email: dto.Email
            }
        });
        if (OldUser)
            throw new common_1.BadRequestException('Данный email уже занят');
        const User = await this.prisma.user.create({
            data: {
                Email: dto.Email,
                Password: await (0, argon2_1.hash)(dto.Password),
                Role: dto.Role
            }
        });
        if (User.Role == 1) {
            const OldCustomer = await this.prisma.customer.findUnique({
                where: {
                    UserId: User.Id
                }
            });
            if (OldCustomer)
                throw new common_1.BadRequestException('Данный UserId уже занят');
            await this.prisma.customer.create({
                data: {
                    user: {
                        connect: { Id: User.Id }
                    },
                    Name: dto.Name,
                    PhoneNumber: dto.PhoneNumber,
                    AvatarPath: dto.AvatarPath
                }
            });
        }
        else if (User.Role == 2) {
            const OldHandyMan = await this.prisma.customer.findUnique({
                where: {
                    UserId: User.Id
                }
            });
            if (OldHandyMan)
                throw new common_1.BadRequestException('Данный UserId уже занят');
            await this.prisma.handyMan.create({
                data: {
                    user: {
                        connect: { Id: User.Id }
                    },
                    Name: dto.Name,
                    PhoneNumber: dto.PhoneNumber,
                    AvatarPath: dto.AvatarPath
                }
            });
        }
        const tokens = await this.IssueTokens(User.Id);
        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }
    async GetNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Несоответствующий refresh token');
        const User = await this.prisma.user.findUnique({ where: { Id: result.id } });
        const tokens = await this.IssueTokens(User.Id);
        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }
    async Login(dto) {
        const User = await this.ValidateUser(dto);
        const tokens = await this.IssueTokens(User.Id);
        return {
            User: this.ReturnUserFields(User),
            ...tokens
        };
    }
    async IssueTokens(userId) {
        const data = {
            Id: userId
        };
        const AcssesToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });
        const RefreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        });
        return { AcssesToken, RefreshToken };
    }
    ReturnUserFields(user) {
        return {
            Id: user.Id,
            Email: user.Email
        };
    }
    async ValidateUser(dto) {
        const User = await this.prisma.user.findUnique({
            where: { Email: dto.Email }
        });
        if (!User)
            throw new common_1.NotFoundException('Пользователь не найден');
        const IsValid = await (0, argon2_1.verify)(User.Password, dto.Password);
        if (!IsValid)
            throw new common_1.UnauthorizedException('Неверный пароль');
        return User;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map