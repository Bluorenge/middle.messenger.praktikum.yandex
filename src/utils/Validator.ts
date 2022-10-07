export enum ValidationType {
    EMAIL = 'email',
    NAME = 'name',
    LOGIN = 'login',
    PHONE = 'phone',
    PASSWORD = 'password',
}

class Validator {
    private email(value: string): [boolean, string] {
        return [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Некорректный адрес почты',
        ];
    }

    private name(value: string): [boolean, string] {
        const isFirstLetterUppercase = /^[A-ZА-ЯЁ][a-zа-яё\-]/.test(value);

        if (!isFirstLetterUppercase) {
            return [false, 'Первая буква должна быть заглавной'];
        }
        return [
            /^[A-ZА-ЯЁ][a-zа-яё-]+$/.test(value),
            'Допустимые символы: латиница, кириллица и дефис',
        ];
    }

    private login(value: string): [boolean, string] {
        const isValidLenght = this.isValidLenght(value, 3, 20);
        const isOnlyNumber = /^\d+$/.test(value);

        if (!isValidLenght) {
            return [
                isValidLenght,
                'Длина логина должна быть от 3 до 20 символов',
            ];
        }
        if (isOnlyNumber) {
            return [false, 'Логин не должен содержать только цифры'];
        }
        return [
            /^[A-Za-z0-9_\-]$/.test(value),
            'Допустимые символы: латиница, цифры, _ и -',
        ];
    }

    private password(value: string): [boolean, string] {
        const isValidLenght = this.isValidLenght(value, 8, 40);

        if (!isValidLenght) {
            return [
                isValidLenght,
                'Длина пароля должна быть от 8 до 40 символов',
            ];
        }
        return [
            /[A-Z]/.test(value) && /[0-9]/.test(value),
            'Пароль должен содержать хотя бы одну заглавную букву и цифру',
        ];
    }

    private phone(value: string): [boolean, string] {
        const isValidLenght = this.isValidLenght(value.replace(/\(|\s|\)/g, ''), 10, 15);

        if (!isValidLenght) {
            return [
                isValidLenght,
                'Длина телефона может быть от 8 до 40 символов',
            ];
        }
        return [/^\+?[0-9]$/.test(value), 'Некорректный номер телефона'];
    }

    private isValidLenght(value: string, minLength: number, maxLength: number) {
        return value.length > minLength && value.length < maxLength;
    }

    public validate(type: ValidationType, value: string): [boolean, string] {
        switch (type) {
            case ValidationType.EMAIL:
                return this.email(value);
            case ValidationType.LOGIN:
                return this.login(value);
            case ValidationType.NAME:
                return this.name(value);
            case ValidationType.PHONE:
                return this.phone(value);
            case ValidationType.PASSWORD:
                return this.password(value);
            default:
                return [!!value.length, 'Поле не должно быть пустым'];
        }
    }
}

export default new Validator();
