import HTTPTransport from '../utils/HttpTransport';

export default abstract class BaseAPI {
    protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

    public abstract create?(data: unknown): Promise<unknown>;

    public abstract read?(identifier?: string | Record<string, any> | number): Promise<unknown>;

    public abstract update?(identifier: string, data: unknown): Promise<unknown>;

    public abstract delete?(identifier: string | number): Promise<unknown>;
}
