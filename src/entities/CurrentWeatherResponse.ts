export default interface CurrentWeatherResponse {
    clouds: {
        all: number
    },
    coord: {lon: number, lat: number},
    main: {
        feels_like: number,
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    name: string,
    timezone: number,
    visibility: number,
    weather: {
        description: string,
        main: string
    }[],
    wind: {
        deg: number,
        gust: number,
        speed: number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    }
};