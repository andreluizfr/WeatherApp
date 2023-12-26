import { WeatherType } from "@entities/WeatherType";

export default function rewriteWeatherType(weatherType: WeatherType) {
    switch(weatherType){
        case "sunny": return "sunny";
        case "starry": return "starry";
        case "rainy": return "rainy";
        case "snowy": return "snowy";
        case "cloudy-day": return "cloudy";
        case "cloudy-night": return "cloudy";
        case "thundery": return "thundery"
        default: return "not listed"
    }
}