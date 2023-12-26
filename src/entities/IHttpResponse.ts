export interface IHttpResponse<T>{
    message: string,
    data: T | null
}
