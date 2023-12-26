//Bridge pattern
export interface IHttpClient<T>{
    get(path: string, header?: object) : Promise<T>;
    post(path: string, body: object, header?: object) : Promise<T>;
}