import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
    getNewTokens(dto: RefreshTokenDto): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        AcssesToken: string;
        RefreshToken: string;
        User: {
            Id: number;
            Email: string;
        };
    }>;
}
