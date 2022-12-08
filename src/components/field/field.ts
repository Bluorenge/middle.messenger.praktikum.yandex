import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import template from './field.hbs';
import { registerComponent } from '../../utils/hbsHelpers';
// @ts-ignore
import components from './*/*.ts';

Object.entries(components).forEach(([key, value]: any) =>
    registerComponent(value[key].default),
);

type FieldProps = {
    type: string;
    name: string;
    label: string;
    value?: string;
    accept?: string;
    isDisable?: boolean;
    validationType?: ValidationType;
    isTopLabelPosition: boolean;
    class?: string;
    icon?: string;
    onBlur?: (e: Event) => void;
    onInput?: (e: Event) => void;
    onChange?: (e: Event) => void;
    onInputField?: (e: Event) => void;
};

export default class Field extends Block<FieldProps> {
    private _initFieldTitleText: string | null = null;

    constructor(props: FieldProps) {
        super(props);

        this._initFieldTitleText = this.getFieldTitleEl()!.textContent;

        this.setProps({
            ...props,
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

    componentDidMount() {
        this.setTopLabelPosition(this.props.value);
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
        this.setTopLabelPosition(value);

        const onInputField = this.props.onInputField;
        if (onInputField) {
            onInputField(e);
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

    public checkValid(value: string, compareValue?: string): boolean {
        const [isValid, message] = Validator.validate(
            this.props.validationType as ValidationType,
            value,
            compareValue,
        );

        this.refs.errorMessage.setProps({
            isValid: isValid,
            text: !isValid ? message : '',
        });

        return isValid;
    }

    private setTopLabelPosition(value: string | undefined): void {
        if (value && this.props.isTopLabelPosition) {
            const FILLED_CLASS = 'field--filled';
            this.getContent()?.classList[value === '' ? 'remove' : 'add'](FILLED_CLASS);
        }
    }
}
