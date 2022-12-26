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
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get <Response>(url: string, options: RequestOptions = {}): Promise<Response> {
        url = options.data ? url + queryStringify(options.data) : url;
        return this.request(
            this.endpoint + url,
            { ...options, method: METHODS.GET },
            options.timeout,
        );
    }

    public post <Response>(url: string, options: RequestOptions = {}): Promise<Response> {
        return this.request(
            this.endpoint + url,
            { ...options, method: METHODS.POST },
            options.timeout,
        );
    }

    public put <Response>(url: string, options: RequestOptions = {}): Promise<Response> {
        return this.request(
            this.endpoint + url,
            { ...options, method: METHODS.PUT },
            options.timeout,
        );
    }

    public delete <Response>(url: string, options: RequestOptions = {}): Promise<Response> {
        return this.request(
            this.endpoint + url,
            {
                ...options,
                method: METHODS.DELETE,
            },
            options.timeout,
        );
    }

    private request <Response>(url: string, options: RequestOptions, timeout = 5000): Promise<Response> {
        const { method, data, headers = { 'Content-Type': 'application/json' } } = options;
        const isFormData = data instanceof FormData;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method!, url);

            if (!isFormData) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onabort = () => reject({ reason: 'abort' });
            xhr.onerror = () => reject({ reason: 'network error' });
            xhr.timeout = timeout;
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(isFormData ? data : JSON.stringify(data));
            }
        });
    }
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
