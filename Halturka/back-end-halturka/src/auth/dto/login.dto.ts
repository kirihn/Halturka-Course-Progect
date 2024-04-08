import { IsEmail, IsString, MinLength, } from "class-validator";

export class LoginDto{

    @IsEmail()
    Email: string

    @MinLength(8, {
        message: 'Пароль должен содержать минимум 8 символов'
    })
    @IsString()
    Password: string

    //@IsOptional
}