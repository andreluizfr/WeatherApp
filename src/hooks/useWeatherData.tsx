import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";
import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";
import getSunrise from "@utils/getSunrise";
import getSunset from "@utils/getSunset";
import getWeatherType from "@utils/getWeatherType";
import searchNextDayTemperature from "@utils/searchNextDayTemperature";
import searchNextDayWeather from "@utils/searchNextDayWeather";
import { useMemo } from "react";

interface props {
    currentWeatherResponse: CurrentWeatherResponse | null,
    hourlyWeatherResponse: HourlyWeatherResponse | null
}

export default function useWeatherData({currentWeatherResponse, hourlyWeatherResponse}: props) {

    const weatherData = useMemo(()=>{

        if(currentWeatherResponse && hourlyWeatherResponse){

            const sunriseString = getSunrise(currentWeatherResponse);
            const sunsetString = getSunset(currentWeatherResponse);

            return {
                sunriseString: sunriseString,
                sunsetString: sunsetString,
                weather: getWeatherType(
                    currentWeatherResponse.weather[0].main,
                    new Date(),
                    currentWeatherResponse.timezone,
                    sunriseString,
                    sunsetString
                ),
                currentTemperature: (currentWeatherResponse.main.temp - 273).toFixed(1),
                maxTemperature: (currentWeatherResponse.main.temp_max - 273).toFixed(0),
                minTemperature: (currentWeatherResponse.main.temp_min - 273).toFixed(0),
                dawnForecastWeather: searchNextDayWeather(hourlyWeatherResponse, 3, sunriseString, sunsetString),
                morningForecastWeather: searchNextDayWeather(hourlyWeatherResponse, 9, sunriseString, sunsetString),
                afternoonForecastWeather: searchNextDayWeather(hourlyWeatherResponse, 15, sunriseString, sunsetString),
                nightForecastWeather: searchNextDayWeather(hourlyWeatherResponse, 21, sunriseString, sunsetString),
                dawnForecastTemperature: searchNextDayTemperature(hourlyWeatherResponse, 3),
                morningForecastTemperature: searchNextDayTemperature(hourlyWeatherResponse, 9),
                afternoonForecastTemperature: searchNextDayTemperature(hourlyWeatherResponse, 15),
                nightForecastTemperature: searchNextDayTemperature(hourlyWeatherResponse, 21),
                windSpeed: currentWeatherResponse.wind.speed,
                humidity: currentWeatherResponse.main.humidity,
            }
        }
        else return null;
    }, [currentWeatherResponse, hourlyWeatherResponse]);

    return weatherData;
}