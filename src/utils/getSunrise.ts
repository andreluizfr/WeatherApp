import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";
import { getTimezonedDate } from "./getTimezonedDate";

export default function getSunrise(response: CurrentWeatherResponse) {
    const localDate = new Date(response.sys.sunrise*1000);
    const utcDate = getTimezonedDate(localDate, response.timezone);

    const hours = utcDate.getHours();
    const minutes = ('0' + utcDate.getMinutes()).slice(-2);

    if(hours < 10) return "0"+hours + ":" + minutes + " AM";
    if(hours < 12) return hours + ":" + minutes + " AM";
    if(hours === 12) return hours + ":" + minutes + " PM";
    if(hours > 21) return (hours - 12) + ":" + minutes + " PM";
    else return "0"+(hours - 12) + ":" + minutes + " PM";
}