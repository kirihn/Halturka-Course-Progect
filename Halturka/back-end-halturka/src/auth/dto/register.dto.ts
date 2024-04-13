import { IsEmail, IsNumber, IsNumberString, IsOptional, IsString, Max, Min, MinLength, Validate, isInt, min } from "class-validator";
import { PhoneValidator } from "../../validators/phone.validator"

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

    @IsString()
    Name: string

    @IsString()
    @Validate(PhoneValidator, { message: 'Телефонный номер должен начинаться с +375 и иметь длину 13 символов' })
    PhoneNumber: string
    
    @IsOptional()
    @IsString()
    AvatarPath: string
}