import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";
import { IHttpError } from "@entities/IHttpError";
import { City } from "@entities/City";

import cityPositions from "@data/cityPositions.json";

import { makeHttpClient } from "@factories/makeHttpClient";

import { useEffect, useState } from "react";

export default function GetCurrentWeatherService(city: City) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState<CurrentWeatherResponse| null>(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<IHttpError | null>(null);
    
    useEffect(()=>{
 
        const httpClient = makeHttpClient<CurrentWeatherResponse>("current");

        const path = "/weather?lat=" + cityPositions[city].lat
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