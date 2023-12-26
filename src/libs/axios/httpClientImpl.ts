import { IHttpClient } from './IHttpClient';
import { IHttpResponse } from '@entities/IHttpResponse';
import { IHttpError } from '@entities/IHttpError';

import { AxiosError, AxiosInstance } from 'axios';

//Bridge pattern
export class AxiosHttpClientImpl<T> implements IHttpClient<T> {

    axiosInstance;

    constructor(instance: AxiosInstance){
        this.axiosInstance = instance;
    }

    async get(path: string, header?: object){

        try{
            const response = await this.axiosInstance.get<T>(path,header);

            return response.data;

        } catch (err: unknown) {

            throw this.generateHttpError(err);
        }
    }

    async post(path: string, body: object, header?: object){

        try{
            const response = await this.axiosInstance.post<T>(path, body, header);

            return response.data;

        } catch (err: unknown) {

            throw this.generateHttpError(err);
        }
    }

    generateHttpError(err: unknown): IHttpError {

        const error = err as AxiosError<IHttpResponse<T>>;

        if (error.response) return {
            httpStatusCode: error.response.status,
            message:  error.response.data.message
        };

        else if (error.request) return {
            httpStatusCode: null,
            message:  'Erro: O servidor não pode responder a essa requisição.'
        };

        else return {
            httpStatusCode: null,
            message:  error.message
        };

    }

}