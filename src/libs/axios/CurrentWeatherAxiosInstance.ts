import axios from "axios";

const currentWeatherAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_CURRENT_WEATHER_API_BASE_URL
});

export { currentWeatherAxiosInstance };