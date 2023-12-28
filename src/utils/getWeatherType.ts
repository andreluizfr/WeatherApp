import { WeatherType } from "@entities/WeatherType";
import { getTimezonedDate } from "./getTimezonedDate";

export default function getWeatherType (weather: string, date: Date, timezone: number | null, sunriseString: string, sunsetString: string): WeatherType {

    if(timezone !== null) 
        date = getTimezonedDate(date, timezone); 

    const sunrise = setDateHoursFromString(date, sunriseString);
    const sunset = setDateHoursFromString(date, sunsetString);

    if (weather === "Clear" && isNight(date, sunrise, sunset)) return "starry";
    if (weather === "Clear" && isDay(date, sunrise, sunset)) return "sunny";
    if (weather === "Clouds" && isNight(date, sunrise, sunset)) return "cloudy-night";
    if (weather === "Clouds" && isDay(date, sunrise, sunset)) return "cloudy-day";
    if (weather === "Rain" || weather === "Drizzle") return "rainy";
    if (weather === "Thunderstorm") return "thundery";
    if (weather === "Fog") return "fog";
    if (weather === "Snow") return "snowy";

    return "unknown";
}

function isNight(date: Date, sunrise: Date, sunset: Date) {
    if(date.getTime() < sunrise.getTime() || date.getTime() > sunset.getTime()) return true; 
    return false;
}

function isDay(date: Date, sunrise: Date, sunset: Date) {
    if(date.getHours() >= sunrise.getTime() || date.getHours() <= sunset.getTime()) return true;
    return false;
}

function setDateHoursFromString(date: Date, hoursString: string) { //a hora chega no formato 05:45
    const newDate = new Date(date);
    newDate.setHours(Number(hoursString.slice(0,2)), Number(hoursString.slice(3,5)), 0);
    return newDate;
}

