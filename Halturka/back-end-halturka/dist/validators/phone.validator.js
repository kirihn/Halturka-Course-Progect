"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneValidator = void 0;
class PhoneValidator {
    validate(value, args) {
        const phoneNumber = value;
        return phoneNumber.startsWith('+375') && phoneNumber.length === 13;
    }
    defaultMessage(args) {
        return 'Телефонный номер должен начинаться с +375 и иметь длину 13 символов';
    }
}
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=phone.validator.js.map