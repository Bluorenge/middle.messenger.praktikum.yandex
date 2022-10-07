enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type RequestOptions = {
    method?: METHODS;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
};

export default class HTTPTransport {
    public get = (url: string, options: RequestOptions = {}) => {
        url = options.data ? url + queryStringify(options.data) : url;
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout,
        );
    };

    public post = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout,
        );
    };

    public put = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout,
        );
    };

    public delete = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            {
                ...options,
                method: METHODS.DELETE,
            },
            options.timeout,
        );
    };

    private request = (url: string, options: RequestOptions, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        if (!method) {
            return;
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: TObj) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    return Object.entries(data).reduce((string, item, index, initArr) => {
        let newString = `${string}${item[0]}=${item[1]}&`;
        if (index === initArr.length - 1) {
            newString = newString.slice(0, -1);
        }
        return newString;
    }, '?');
}
