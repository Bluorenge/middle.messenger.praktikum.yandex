export enum ValidationType {
    EMAIL = 'email',
    NAME = 'name',
    LOGIN = 'login',
    PHONE = 'phone',
    PASSWORD = 'password',
    EMPTY = 'empty',
    NONE = 'none',
}

class Validator {
    private email(value: string): [boolean, string] {
        return [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Некорректный адрес почты',
        ];
    }

    private name(value: string): [boolean, string] {
        const isFirstLetterUppercase = /^[A-ZА-ЯЁ](.*)$/.test(value);

        if (!isFirstLetterUppercase) {
            return [false, 'Первая буква должна быть заглавной'];
        }
        return [
            /^[A-ZА-ЯЁa-zа-яё-]+$/.test(value),
            'Допустимые символы: латиница, кириллица и дефис',
        ];
    }

    private login(value: string): [boolean, string] {
        const isValidLenght = /^.{3,20}$/.test(value);
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
            /^[A-Za-z0-9_\-]+$/.test(value),
            'Допустимые символы: латиница, цифры, _ и -',
        ];
    }

    private password(value: string, compareValue?: string): [boolean, string] {
        const isValidLenght = /^.{8,40}$/.test(value);

        if (!isValidLenght) {
            return [
                isValidLenght,
                'Длина пароля должна быть от 8 до 40 символов',
            ];
        }
        if (compareValue && value !== compareValue) {
            return [false, 'Введённые пароли не совпадают'];
        }
        return [
            /[A-Z]/.test(value) && /[0-9]/.test(value),
            'Пароль должен содержать хотя бы одну заглавную букву и цифру',
        ];
    }

    private phone(value: string): [boolean, string] {
        const isValidLenght = /^.{10,15}$/.test(value);

        if (!isValidLenght) {
            return [
                isValidLenght,
                'Длина телефона может быть от 8 до 15 символов',
            ];
        }
        return [/^\+?[0-9]+$/.test(value), 'Телефон должен содержать только цифры (возможен плюс в начале)'];
    }

    public validate(type: ValidationType, value: string, compareValue?: string): [boolean, string] {
        if (type === ValidationType.NONE) {
            return [true, 'да всё норм'];
        }
        if (!value.length || type === ValidationType.EMPTY) {
            return [!!value.length, 'Поле не должно быть пустым'];
        }
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
                return this.password(value, compareValue);
        }
    }
}

export default new Validator();
