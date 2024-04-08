import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    Register(dto: RegisterDto): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
    GetNewTokens(refreshToken: string): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
    Login(dto: LoginDto): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
    private IssueTokens;
    private ReturnUserFields;
    private ValidateUser;
}
