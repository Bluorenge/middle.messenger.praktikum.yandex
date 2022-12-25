import Block from './Block';

export default function getFormData(block: Block): Record<string, string> {
    const element = block.getContent();
    const inputs = element!.querySelector('form')!.querySelectorAll('input');
    const data: Record<string, string> = {};

    if (inputs) {
        inputs.forEach(input => {
            const value = input.value;
            data[input.name] = value;
        });
        console.log('data: ', data);
    }
    return data;
}
