import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { LoginDto } from './dto/login.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* log getnewtoken reg */
  @UsePipes(new ValidationPipe()) // check
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.authService.Login(dto);
  }

  @UsePipes(new ValidationPipe()) // check
  @HttpCode(200)
  @Post('login/accses-token')
  async getNewTokens(@Body() dto: RefreshTokenDto){
    console.log(dto)
    return this.authService.GetNewTokens(dto.RefreshToken);
  }

  @UsePipes(new ValidationPipe()) // check
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto){
    return this.authService.Register(dto);
  }
}
