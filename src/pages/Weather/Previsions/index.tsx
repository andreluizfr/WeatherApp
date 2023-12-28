import './styles.css';
import { WeatherData } from "@entities/WeatherData";
import WeatherIcon from "@components/WeatherIcon";
import { memo } from "react";

interface props {
    weatherData: WeatherData | null
}

function Previsions ({weatherData}: props) {

    if(weatherData)
        return (
            <div className='Previsions' data-testid='previsions'>
                <div className='Day-period'>
                    <span className='Title Text-bright'>dawn</span>
                    <span className='Subtitle Text-bright'>03:00</span>
                    <WeatherIcon weather={weatherData.dawnForecastWeather}/>
                    <div>
                        <span className='Temperature Text-bright' data-testid='dawn-prevision'>{weatherData.dawnForecastTemperature}</span>
                        <span className='Measure Text-bright'><i>°</i>C</span>
                    </div>
                </div>
                <div className='Day-period'>
                    <span className='Title Text-bright'>morning</span>
                    <span className='Subtitle Text-bright'>09:00</span>
                    <WeatherIcon weather={weatherData.morningForecastWeather}/>
                    <div>
                        <span className='Temperature Text-bright' data-testid='morning-prevision'>{weatherData.morningForecastTemperature}</span>
                        <span className='Measure Text-bright'><i>°</i>C</span>
                    </div>
                </div>
                <div className='Day-period'>
                    <span className='Title Text-bright'>afternoon</span>
                    <span className='Subtitle Text-bright'>15:00</span>
                    <WeatherIcon weather={weatherData.afternoonForecastWeather}/>
                    <div>
                        <span className='Temperature Text-bright' data-testid='afternoon-prevision'>{weatherData.afternoonForecastTemperature}</span>
                        <span className='Measure Text-bright'><i>°</i>C</span>
                    </div>
                </div>
                <div className='Day-period'>
                    <span className='Title Text-bright'>night</span>
                    <span className='Subtitle Text-bright'>21:00</span>
                    <WeatherIcon weather={weatherData.nightForecastWeather}/>
                    <div>
                        <span className='Temperature Text-bright' data-testid='night-prevision'>{weatherData.nightForecastTemperature}</span>
                        <span className='Measure Text-bright'><i>°</i>C</span>
                    </div>
                </div>
            </div>
        );

    return <></>;
}

const PrevisionsMemoized = memo(Previsions);

export default PrevisionsMemoized;