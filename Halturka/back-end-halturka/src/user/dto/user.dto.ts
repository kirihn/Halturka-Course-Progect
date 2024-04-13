import { IsOptional, IsString, Length, MinLength, Validate, ValidationArguments, ValidatorConstraintInterface, } from "class-validator";
import { PhoneValidator } from "../../validators/phone.validator"
// class PhoneValidator implements ValidatorConstraintInterface {
//     validate(value: any, args: ValidationArguments) {
//       const phoneNumber = value as string;
//       return phoneNumber.startsWith('+375') && phoneNumber.length === 13;
//     }
  
//     defaultMessage(args: ValidationArguments) {
//       return 'Телефонный номер должен начинаться с +375 и иметь длину 13 символов';
//     }
// }
  
export class UserDto{

    @IsOptional()
    @IsString()
    @MinLength(1, {
        message: 'Имя должно содержать хотя бы 1 символ'
    })
    Name: string
    
    @IsString()
    @Validate(PhoneValidator, { message: 'Телефонный номер должен начинаться с +375 и иметь длину 13 символов' })
    PhoneNumber: string
    
    @IsOptional()
    @IsString()
    AvatarPath: string
}

