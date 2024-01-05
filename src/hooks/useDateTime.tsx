import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";
import { getTimezonedDate } from "@utils/getTimezonedDate";
import { useEffect, useState } from "react";

interface props {
    currentWeatherResponse: CurrentWeatherResponse | null,
}

export default function useDateTime ({currentWeatherResponse}: props) {

    const [dateTime, setDateTime] = useState<Date | null>(null);

    useEffect(()=>{
        if(currentWeatherResponse) setDateTime(getTimezonedDate(new Date(), currentWeatherResponse.timezone));
    }, [currentWeatherResponse]);

    useEffect(()=>{
        let interval: NodeJS.Timeout;

        if(dateTime){
            interval = setInterval(()=>{
                setDateTime(new Date(dateTime.getTime() + 1000));
            }, 1000);

            return () => clearInterval(interval);
        }

        return ;
    }, [dateTime]);

    return dateTime;
}