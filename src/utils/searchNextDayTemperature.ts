import HourlyWeatherResponse from "@entities/HourlyWeatherResponse";

export default function searchNextDayTemperature(response: HourlyWeatherResponse, hours: number) {

    const nextDay = new Date();

    nextDay.setTime(nextDay.getTime() + 86400000); //next day
    nextDay.setHours(hours, 0, 0);
    
    const dateHoursString = nextDay.toLocaleTimeString();
    const nextDayString = nextDay.getFullYear() + "-" 
        + (((nextDay.getMonth()+1)<10) ? "0"+(nextDay.getMonth()+1) : (nextDay.getMonth()+1)) + "-"
        + ((nextDay.getDate()<10) ? "0"+nextDay.getDate() : nextDay.getDate()) + " "
        + dateHoursString;

    if(response == undefined) return 0;
    return (response.list.filter(data => data.dt_txt === nextDayString)[0]?.main.temp - 273).toFixed(0);
}