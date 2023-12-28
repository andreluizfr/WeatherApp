import { WeatherType } from "./WeatherType";

export interface WeatherData {
    sunriseString: string;
    sunsetString: string;
    weather: WeatherType;
    currentTemperature: string;
    maxTemperature: string;
    minTemperature: string;
    dawnForecastWeather: WeatherType;
    morningForecastWeather: WeatherType;
    afternoonForecastWeather: WeatherType;
    nightForecastWeather: WeatherType;
    dawnForecastTemperature: string;
    morningForecastTemperature: string;
    afternoonForecastTemperature: string;
    nightForecastTemperature: string;
    windSpeed: number;
    humidity: number;
}