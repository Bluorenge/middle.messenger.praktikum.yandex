type Indexed<T = unknown> = {
    [key in string]: T;
};

function trim(string: string, chars?: string): string {
    if (string && !chars) {
        return string.trim();
    }

    const reg = new RegExp(`[${chars}]`, 'gi');
    return string.replace(reg, '');
}

// * не умеет перезаписывать значения массивов, только объединять
function merge(lhs: Indexed, rhs: Indexed): Indexed {
    return [lhs, rhs].reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (isArray(pVal) && isArray(oVal)) {
                prev[key] = [...new Map(
                    pVal
                        .concat(...oVal)
                        .map(v => [JSON.stringify(v), v]),
                ).values()];
            } else if (isPlainObject(pVal) && isPlainObject(oVal)) {
                prev[key] = merge(pVal as Indexed, oVal as Indexed);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is Indexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
    return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: Indexed, rhs: Indexed) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value as Indexed, rightValue as Indexed)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

function debounce(fn: any, ms = 300) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
}

const cloneDeep = <T>(target: T): T => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach((v) => { cp.push(v); });
        return cp.map((n: any) => cloneDeep<any>(n)) as any;
    }
    if (typeof target === 'object') {
        const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(cp).forEach(k => {
            cp[k] = cloneDeep<any>(cp[k]);
        });
        return cp as T;
    }
    return target;
};

export { trim, set, isEqual, debounce, merge, cloneDeep };
