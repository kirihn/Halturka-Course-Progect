import {ValidationArguments, ValidatorConstraintInterface, } from "class-validator";

export class PhoneValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      const phoneNumber = value as string;
      return phoneNumber.startsWith('+375') && phoneNumber.length === 13;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Телефонный номер должен начинаться с +375 и иметь длину 13 символов';
    }
}