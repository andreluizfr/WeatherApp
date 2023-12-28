import './styles.css';
import { WeatherData } from "@entities/WeatherData";
import { memo } from "react";

interface props {
    weatherData: WeatherData | null
}

function MoreInfos ({weatherData}: props) {

    if(weatherData)
        return (
            <div className='More-infos' data-testid='more-infos'>
                <div className='Wrapper'>
                    <span className='Title Text-brighter'>wind speed</span>
                    <span className='Value Text-bright'>{weatherData.windSpeed} m/s</span>
                </div> 
                <div className='Wrapper'>
                    <span className='Title Text-brighter'>sunrise</span>
                    <span className='Value Text-bright'>{weatherData.sunriseString}</span>
                </div>
                <div className='Wrapper'>
                    <span className='Title Text-brighter'>sunset</span>
                    <span className='Value Text-bright'>{weatherData.sunsetString}</span>
                </div>
                <div className='Wrapper'>
                    <span className='Title Text-brighter'>humidity</span>
                    <span className='Value Text-bright'>{weatherData.humidity}%</span>
                </div>
            </div>
        );
        
    return <></>;
}

const MoreInfosMemoized = memo(MoreInfos);

export default MoreInfosMemoized;