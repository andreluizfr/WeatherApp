import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";
import getWeatherType from "./getWeatherType";

export default function searchNextDayWeather(response: HourlyWeatherResponse, hours: number, sunrise: string, sunset: string) {

    if(response == undefined) return "unknown";

    const nextDay = new Date();

    nextDay.setTime(nextDay.getTime() + 86400000); //next day
    nextDay.setHours(hours, 0, 0);
    
    const formatedDateTxt = formatDate(nextDay);

    const hourlyWeatherResponse = response.list.find(data => data.dt_txt === formatedDateTxt);

    const weather = hourlyWeatherResponse ? hourlyWeatherResponse.weather[0].main : "";

    return getWeatherType(weather, nextDay, null, sunrise, sunset);
}

function formatDate (date: Date) {
    return date.toISOString().slice(0,10) + " " + date.toLocaleTimeString(); //deixa data no formato 2023-09-12 03:00:00
}