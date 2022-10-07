import Block from './Block';

export default function getFormData(block: Block): void {
    const element = block.getContent();
    const inputs = element!.querySelectorAll('input');
    const data: Record<string, unknown> = {};

    if (inputs) {
        inputs.forEach(input => {
            const value = input.value;
            data[input.name] = value;

            block.refs[input.name].checkValid(value);
        });
        console.log('data: ', data);
    }
}
