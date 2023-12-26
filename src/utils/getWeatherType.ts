import { WeatherType } from "@entities/WeatherType";

export default function getWeatherType (weather: string, date: Date, timezone?: number): WeatherType {
    let utcDate = new Date(date);
    utcDate.setTime(utcDate.getTime() + (timezone?(timezone*1000):0)); //acrescentar timezone da região
    if(timezone){
        utcDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000)); //acrescentar timezone -03:00 do brasil ou de qualquer outro sistema que irá rodar
        console.log("dateTime in the city: " + utcDate.toLocaleString()); //só pra confirmar a conversão de horários
    }

    if (weather === "Clear" && isNight(utcDate)) return "starry";
    if (weather === "Clear" && isDay(utcDate)) return "sunny";
    if (weather === "Clouds" && isNight(utcDate)) return "cloudy-night";
    if (weather === "Clouds" && isDay(utcDate)) return "cloudy-day";
    if (weather === "Rain" || weather === "Drizzle") return "rainy";
    if (weather === "Thunderstorm") return "thundery";
    if (weather === "Snow") return "snowy";
    if (weather === "Snow") return "snowy";

    return "unknown";
}

//já que foi pedido que dawn, morning, afternoon e night fossem 3, 9, 15, 21
//as definiçoes de dia e noite foram feitas com as horas 6 e 18 pra simplificar
//o ideal seria fazer as checagens com as horas de sunrise e sunset de cada local

function isNight(date: Date) {
    if(date.getHours() < 6 || date.getHours() > 18) return true; 
    return false;
}

function isDay(date: Date) {
    if(date.getHours() >= 6 || date.getHours() <= 18) return true;
    return false;
}

