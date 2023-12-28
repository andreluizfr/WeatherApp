import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";
import { IHttpError } from "@entities/IHttpError";
import { City } from "@entities/City";

import cityPositions from "@data/cityPositions.json";

import { makeHttpClient } from "@factories/makeHttpClient";

import { useEffect, useState } from "react";


export default function GetHourlyWeatherService(city: City) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<HourlyWeatherResponse | null>(null);
    const [error, setError] = useState<IHttpError | null>(null);
    
    useEffect(()=>{
 
        const httpClient = makeHttpClient<HourlyWeatherResponse>("hourly");

        const path = "/forecast?lat=" + cityPositions[city].lat
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