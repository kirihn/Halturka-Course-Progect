import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class PhoneValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
