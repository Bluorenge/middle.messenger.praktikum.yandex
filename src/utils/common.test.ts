import { expect } from 'chai';
import { set } from './common';

describe('set function', () => {
    let obj: Record<string, unknown>, path: string, value: unknown;

    beforeEach(() => {
        obj = {};
        path = 'a.b.c';
        value = 3;
    });

    it('should set a value by path to the object', () => {
        const result: any = set(obj, path, value);

        expect(result.a.b.c as any).to.eq(value);
    });

    it('should return not original object', () => {
        const result = set(obj, path, value);

        obj.test2 = 'another value';

        expect(result).not.equal(obj);
    });

    it('should return original object if it\'s not an object', () => {
        const notAnObject = 'string';

        const result = set(notAnObject, path, value);

        expect(result).to.eq(notAnObject);
    });

    it('should throw an error if path is not a string', () => {
        const pathNotAString = 10;

        // @ts-ignore because we want to check behaviour in runtime
        const fn = () => set(obj, pathNotAString, value);

        expect(fn).to.throw(Error);
    });
});
