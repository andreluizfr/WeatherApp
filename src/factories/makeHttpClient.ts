import { IHttpClient } from "@libs/axios/IHttpClient";

import { AxiosHttpClientImpl } from "@libs/axios/httpClientImpl";
import { currentWeatherAxiosInstance } from "@libs/axios/CurrentWeatherAxiosInstance";
import { hourlyWeatherAxiosInstance } from "@libs/axios/HourlyWeatherAxiosInstance";

type ServiceType = "current" | "hourly";

//Factory method pattern
export function makeHttpClient<T>(serviceType: ServiceType): IHttpClient<T> {

    switch(serviceType){
        case "current": return new AxiosHttpClientImpl<T>(currentWeatherAxiosInstance);
        case "hourly": return new AxiosHttpClientImpl<T>(hourlyWeatherAxiosInstance);
    }
}