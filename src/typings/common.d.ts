declare type TObj = Record<string, unknown>;
declare module 'handlebars/dist/handlebars.runtime';
declare type Field = {
    type: string;
    name: string;
    label: string;
    value?: string;
    accept?: string;
    isDisable?: boolean;
    validationType?: ValidationType;
    isTopLabelPosition?: boolean;
    class?: string;
    icon?: string;
    onInputField?: (...args) => void;
};
