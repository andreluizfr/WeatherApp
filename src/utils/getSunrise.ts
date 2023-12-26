import CurrentWeatherResponse from "@entities/CurrentWeatherResponse";

export default function getSunrise(response: CurrentWeatherResponse) {
    const localDate = new Date();
    localDate.setTime((response.sys.sunrise*1000) + (response.timezone*1000)); //acrescentar timezone da região
    const utcDate = new Date(localDate.getTime() + (localDate.getTimezoneOffset() * 60000)); //acrescentar timezone -03:00 do brasil ou de qualquer outro sistema que irá rodar

    const hours = utcDate.getHours();
    const minutes = ('0' + utcDate.getMinutes()).slice(-2);

    if(hours < 10) return "0"+hours + ":" + minutes + " AM";
    if(hours < 12) return hours + ":" + minutes + " AM";
    if(hours === 12) return hours + ":" + minutes + " PM";
    if(hours > 21) return (hours - 12) + ":" + minutes + " PM";
    else return "0"+(hours - 12) + ":" + minutes + " PM";
}