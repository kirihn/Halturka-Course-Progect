import { IsEmail, IsNumber, IsNumberString, IsString, Max, Min, MinLength, isInt, min } from "class-validator";

export class RegisterDto{

    @IsEmail()
    Email: string

    @MinLength(8, {
        message: 'Пароль должен содержать минимум 8 символов'
    })
    @IsString()
    Password: string

    @IsNumber()
    @Min(1)
    @Max(2)
    Role: number

    //@IsOptional
}