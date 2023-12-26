export default interface HourlyWeatherResponse {
    city: {
        coord: { lat: number, lon: number },
        county: string,
        id: number,
        name: string,
        population: number,
        sunrise: number
        sunset: number
        timezone: number
    },
    list: {
        clouds: {
            all: number
        },
        dt: number,
        dt_txt: string,
        main: {
            feels_like: number,
            grnd_level: number,
            humidity: number,
            pressure: number,
            sea_level: number,
            temp: number,
            temp_kf: number,
            temp_max: number,
            temp_min: number
        },
        visibility: number,
        weather: {
            description: string,
            main: string
        }[],
        wind: {
            deg: number,
            gust: number,
            speed: number
        }
    }[]
};