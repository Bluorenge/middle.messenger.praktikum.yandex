import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import template from './field.hbs';

type FieldProps = {
    type: string;
    name: string;
    label: string;
    value?: string;
    accept?: string;
    isDisable?: boolean;
    validationType?: ValidationType;
    isTopLabelPosition: boolean;
    icon?: string;
    class: string;
    autocomplete: 'on' | 'off';
    onBlur?: (e: Event) => void;
    onInput?: (e: Event) => void;
    onChange?: (e: Event) => void;
    onInputField?: (e: Event) => void;
};

export default class Field extends Block<FieldProps> {
    public static componentName = 'Field';

    private _initFieldTitleText: string | null = null;

    constructor(props: FieldProps) {
        const fieldProps = props;

        fieldProps.class = `field__input ${fieldProps.class ? fieldProps.class : ''}`;
        if (!fieldProps.autocomplete) {
            fieldProps.autocomplete = 'on';
        }

        super(fieldProps);

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
        this.setLabelVisibility(this.props.value);
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
        this.setLabelVisibility(value);

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
            isShow: !isValid,
            text: !isValid ? message : '',
        });

        return isValid;
    }

    private setLabelVisibility(value: string | undefined): void {
        if (this.props.isTopLabelPosition) {
            const FILLED_TOP_CLASS = 'field--filled-top';
            this.getContent()?.classList[value === '' ? 'remove' : 'add'](FILLED_TOP_CLASS);
        } else {
            const FILLED_CLASS = 'field--filled';
            this.getContent()?.classList[value === '' ? 'remove' : 'add'](FILLED_CLASS);
        }
    }
}
