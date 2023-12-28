import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";
import { IHttpError } from "@entities/IHttpError";
import { City } from "@entities/City";

import cityPositions from "@data/cityPositions.json";

import { makeHttpClient } from "@factories/makeHttpClient";

import { useEffect, useState } from "react";

export default function GetCurrentWeatherService(city: City) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<CurrentWeatherResponse| null>(null);
    const [error, setError] = useState<IHttpError | null>(null);
    
    useEffect(()=>{
 
        const httpClient = makeHttpClient<CurrentWeatherResponse>("current");

        const path = "/weather?lat=" + cityPositions[city].lat
            + "&lon=" + cityPositions[city].lon
            + "&appid=" + import.meta.env.VITE_OPEN_WEATHER_KEY;
        
        httpClient.get(path)
            .then(data=>{
                setIsLoading(false);
                setData(data);
            }).catch(error=>{
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return { isLoading, data, error };
}