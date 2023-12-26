import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";
import { IHttpError } from "@entities/IHttpError";
import { City } from "@entities/City";

import cityPositions from "@data/cityPositions.json";

import { makeHttpClient } from "@factories/makeHttpClient";

import { useEffect, useState } from "react";


export default function GetHourlyWeatherService(city: City) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState<HourlyWeatherResponse | null>(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<IHttpError | null>(null);
    
    useEffect(()=>{
 
        const httpClient = makeHttpClient<HourlyWeatherResponse>("hourly");

        const path = "/forecast?lat=" + cityPositions[city].lat
            + "&lon=" + cityPositions[city].lon
            + "&appid=" + import.meta.env.VITE_OPEN_WEATHER_KEY;
        
        httpClient.get(path)
            .then(data=>{
                setIsLoading(false);
                setLoaded(true);
                setData(data);
            }).catch(error=>{
                setIsError(true);
                setError(error);
                setIsLoading(false);
                setLoaded(true);
            });
    }, []);

    return { isLoading, loaded, data, isError, error };
}