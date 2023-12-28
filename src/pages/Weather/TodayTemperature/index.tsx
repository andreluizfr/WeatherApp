import './styles.css';
import { WeatherData } from "@entities/WeatherData";
import { memo } from "react";
import { HiArrowLongDown, HiMiniArrowLongUp } from "react-icons/hi2";

interface props {
    weatherData: WeatherData | null
}

function TodayTemperature ({weatherData}: props) {

    if(weatherData)
        return (
            <div className='Today-temperature Text'>
                <span className='Temperature' data-testid="current-temperature">{weatherData.currentTemperature}</span>
                <div className='Temperature-complement'>
                    <span className='Measure Text'><i>°</i>C</span>
                    <div className='Max-min-temperature'>
                        <div className='Temperature-plus-arrow'>
                            <HiMiniArrowLongUp className='Arrow Icon-brighter'/>
                            <span className='Temperature Text' data-testid='max-current-temperature'>{weatherData.maxTemperature}°</span>
                        </div>
                        <div className='Temperature-plus-arrow Icon-brighter'>
                            <HiArrowLongDown className='Arrow'/>
                            <span className='Temperature Text' data-testid='min-current-temperature'>{weatherData.minTemperature}°</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    
    return <></>;
}

const TodayTemperatureMemoized = memo(TodayTemperature);

export default TodayTemperatureMemoized;