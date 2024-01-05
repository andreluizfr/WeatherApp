import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";

import { makeHttpClient } from "@factories/makeHttpClient";

interface HourlyWeatherService {
    city: string | null,
    state?: string | null,
    country?: string | null
}

export default function getHourlyWeatherService({city, state, country}: HourlyWeatherService) {
    
    const httpClient = makeHttpClient<HourlyWeatherResponse>("hourly");

    let path;

    if (city){
        path = "/forecast?q=" + city
        + (state ? (","+state) : "")
        + (country ? (","+country) : "")
        + "&appid=" + import.meta.env.VITE_OPEN_WEATHER_KEY;
    }
    else{
        path="";
    }

    return httpClient.get(path);
}