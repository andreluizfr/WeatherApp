//acrescentar timezone -03:00 do brasil ou de qualquer outro sistema que irá rodar e o próprio timezone
export function getTimezonedDate(date: Date, timezone: number) {
    const timezonedDate = new Date(date);
    timezonedDate.setTime(timezonedDate.getTime() + (timezone*1000) + (timezonedDate.getTimezoneOffset() * 60000));
    return timezonedDate;
}