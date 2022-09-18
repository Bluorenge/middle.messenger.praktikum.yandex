import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import template from './field.hbs';
import { registerComponent } from '../../utils/hbsHelpers';
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

interface FieldProps {
    type: string;
    name: string;
    value?: string;
    isDisable?: boolean;
    validationType?: ValidationType;
    isTopLabelPosition?: boolean;
    label: string;
    class?: string;
    icon?: string;
}

export default class Field extends Block {
    private _initFieldTitleText: string | null = null;

    constructor(props: FieldProps) {
        super(props);

        this._initFieldTitleText = this.getFieldTitleEl()!.textContent;

        this.setProps({
            onBlur: this.onInput.bind(this),
            onInput: this.onInput.bind(this),
            onChange: this.onChange.bind(this),
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
    }

    get initFieldTitleText(): string | null {
        return this._initFieldTitleText;
    }

    private getFieldTitleEl(): HTMLElement | undefined {
        const fieldTitleEl = this.getContent()!.querySelector('.field__title');
        if (fieldTitleEl) {
            return fieldTitleEl as HTMLElement;
        }
    }

    private onInput(e: Event): void {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        const validationType = this.props.validationType;
        if (validationType) {
            this.checkValid(value);
        }

        if (this.props.isTopLabelPosition) {
            const FILLED_CLASS = 'field--filled';

            if (value !== '') {
                this.getContent()!.classList.add(FILLED_CLASS);
            } else if (value === '') {
                this.getContent()!.classList.remove(FILLED_CLASS);
            }
        }
    }

    private onChange(e: Event): void {
        if (this.props.type !== 'file') {
            return;
        }

        const fieldTitle = this.getFieldTitleEl();
        const input = e.target as HTMLInputElement;

        if (input.files!.length > 0) {
            fieldTitle!.textContent = input.files![0].name;
        } else if (input.files!.length === 0) {
            fieldTitle!.textContent = this.initFieldTitleText;
        }
    }

    public checkValid(value: string): void {
        const [isValid, message] = Validator.validate(
            this.props.validationType,
            value,
        );

        this.refs.errorMessage.setProps({
            isValid: isValid,
            text: value !== '' ? message : '',
        });
    }
}
