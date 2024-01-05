import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";

import { makeHttpClient } from "@factories/makeHttpClient";

interface CurrentWeatherService {
    city: string | null,
    state?: string | null,
    country?: string | null
}

export default function getCurrentWeatherService({city, state, country}: CurrentWeatherService) {

    const httpClient = makeHttpClient<CurrentWeatherResponse>("current");

    let path;

    if (city){
        path = "/weather?q=" + city
        + (state ? (","+state) : "")
        + (country ? (","+country) : "")
        + "&appid=" + import.meta.env.VITE_OPEN_WEATHER_KEY;
    }
    else{
        path="";
    }
    
    return httpClient.get(path);
}