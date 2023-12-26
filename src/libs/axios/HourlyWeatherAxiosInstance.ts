import axios from "axios";

const hourlyWeatherAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOURLY_WEATHER_API_BASE_URL
});

export { hourlyWeatherAxiosInstance };