import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";

export default function searchNextDayTemperature(response: HourlyWeatherResponse, hours: number) {

    if(response == undefined) return "";

    const nextDay = new Date();

    nextDay.setTime(nextDay.getTime() + 86400000); //next day
    nextDay.setHours(hours, 0, 0);

    const formatedDateTxt = formatDate(nextDay);
    
    const hourlyWeatherResponse = response.list.find(data => data.dt_txt === formatedDateTxt);

    const temperature = hourlyWeatherResponse ? (hourlyWeatherResponse.main.temp - 273).toFixed(0) : "";

    return temperature;
}

function formatDate (date: Date) {
    return date.toISOString().slice(0,10) + " " + date.toLocaleTimeString(); //deixa data no formato 2023-09-12 03:00:00
}