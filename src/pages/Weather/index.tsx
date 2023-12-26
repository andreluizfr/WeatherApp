import './styles.css';
import { IoArrowBackSharp } from "react-icons/io5";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";
import { PiMoonLight } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { BsCloudSnow } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { BsCloudRain } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
import { RiQuestionMark } from "react-icons/ri";

import { motion } from 'framer-motion';

import LoadingPage from "@pages/Loading";

import { City } from '@entities/City';
import { WeatherType } from '@entities/WeatherType';

import GetCurrentWeather from '@services/GetCurrentWeather';
import GetHourlyWeather from '@services/GetHourlyWeather';

import getWeatherType from '@utils/getWeatherType';
import rewriteWeatherType from '@utils/rewriteWeatherType';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchNextDayWeather from '@utils/searchNextDayWeather';
import searchNextDayTemperature from '@utils/searchNextDayTemperature';
import getSunrise from '@utils/getSunrise';
import getSunset from '@utils/getSunset';

export default function WeatherPage(): JSX.Element {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [weather, setWeather] = useState<WeatherType | null>(null);
    const [sunrise, setSunrise] = useState<string | null>(null);
    const [sunset, setSunset] = useState<string | null>(null);
    
    const WeatherIcon = (weather: WeatherType) => {
        switch(weather){
            case "sunny": return <GoSun className='Weather-icon Icon' data-testid='current-weather-sunny'/> 
            case "starry": return <PiMoonLight className='Weather-icon Icon' data-testid='current-weather-starry'/>
            case "rainy": return <BsCloudRain className='Weather-icon Icon' data-testid='current-weather-rainy'/>
            case "snowy": return <BsCloudSnow className='Weather-icon Icon' data-testid='current-weather-snowy'/>
            case "cloudy-day": return <WiDayCloudy className='Weather-icon Icon' data-testid='current-weather-cloudy-day'/>
            case "cloudy-night": return <IoCloudyNightOutline className='Weather-icon Icon' data-testid='current-weather-cloudy-night'/>
            case "thundery": return <BsCloudLightningRain className='Weather-icon Icon' data-testid='current-weather-thundery'/>
            default: return <RiQuestionMark className='Weather-icon Icon' data-testid='current-weather-unknown'/>
        }
    }

    const getCurrentWeatherResult = GetCurrentWeather(searchParams.get("city") as City);
    const getHourlyWeatherResult = GetHourlyWeather(searchParams.get("city") as City);

    useEffect(()=>{
        if(getCurrentWeatherResult.loaded && getHourlyWeatherResult.loaded && getCurrentWeatherResult.data) {
            const weatherPage = (document.getElementsByClassName("WeatherPage")[0] as HTMLElement);
            const weatherType = getWeatherType(getCurrentWeatherResult.data.weather[0].main, new Date(), getCurrentWeatherResult.data.timezone);
            weatherPage?.setAttribute("weather", weatherType); 
            setWeather(weatherType);
            setSunrise(getSunrise(getCurrentWeatherResult.data));
            setSunset(getSunset(getCurrentWeatherResult.data));
        }
    }, [getCurrentWeatherResult, getHourlyWeatherResult, weather]);

    if(getCurrentWeatherResult.isLoading || getHourlyWeatherResult.isLoading) return <LoadingPage/>
    
    return (
        <main className='WeatherPage' data-testid="weather-page">
            
            <aside className='Back-bar'>
                <div className='Rounded' onClick={()=>navigate(-1)}>
                    <IoArrowBackSharp className='Back-icon Icon' data-testid='back-icon'/>
                </div>
            </aside>

            <motion.article 
                className='Weather-container'
                initial={{ x: window.innerWidth/2, opacity: 0}}
                animate={{x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6}}}
            >

                <div className='Title-wrapper'>
                    {searchParams && searchParams.get("city") &&
                        <h1 className='Title Text' data-testid="page-title">{searchParams.get("city")?.toUpperCase()}</h1>
                    }
                    <h2 className='Subtitle Text-bright' data-testid="page-subtitle">{weather?rewriteWeatherType(weather):"unknown"}</h2>
                </div>
                
                {getCurrentWeatherResult && getCurrentWeatherResult.data && (getCurrentWeatherResult.data.main?.temp !== undefined) && 
                    (getCurrentWeatherResult.data.main?.temp_max !== undefined) &&
                    (getCurrentWeatherResult.data.main?.temp_min !== undefined) &&
                    <div className='Today-temperature Text'>
                        <span className='Temperature' data-testid="current-temperature">{(getCurrentWeatherResult.data.main.temp - 273).toFixed(1)}</span>
                        <div className='Temperature-complement'>
                            <span className='Measure Text'><i>°</i>C</span>
                            <div className='Max-min-temperature'>
                                <div className='Temperature-plus-arrow'>
                                    <HiMiniArrowLongUp className='Arrow Icon-brighter'/>
                                    <span className='Temperature Text' data-testid='max-current-temperature'>{(getCurrentWeatherResult.data.main.temp_max - 273).toFixed(0)}°</span>
                                </div>
                                <div className='Temperature-plus-arrow Icon-brighter'>
                                    <HiArrowLongDown className='Arrow'/>
                                    <span className='Temperature Text' data-testid='min-current-temperature'>{(getCurrentWeatherResult.data.main.temp_min - 273).toFixed(0)}°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
                {weather && 
                    WeatherIcon(weather)
                }

                {(getHourlyWeatherResult.isError || getHourlyWeatherResult.isError)?
                    <p className='Text' data-testid='error-message'>Error, please try again later.</p>
                    :
                    <></>
                }
                
                {getHourlyWeatherResult.data &&
                    <div className='Previsions' data-testid='previsions'>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>dawn</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 3))}
                            <div>
                                <span className='Temperature Text-bright' data-testid='dawn-prevision'>{searchNextDayTemperature(getHourlyWeatherResult.data, 3)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>morning</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 9))}
                            <div>
                                <span className='Temperature Text-bright' data-testid='morning-prevision'>{searchNextDayTemperature(getHourlyWeatherResult.data, 9)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>afternoon</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 15))}
                            <div>
                                <span className='Temperature Text-bright' data-testid='afternoon-prevision'>{searchNextDayTemperature(getHourlyWeatherResult.data, 15)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                        <div className='Day-period'>
                            <span className='Title Text-bright'>night</span>
                            {WeatherIcon(searchNextDayWeather(getHourlyWeatherResult.data, 21))}
                            <div>
                                <span className='Temperature Text-bright' data-testid='night-prevision'>{searchNextDayTemperature(getHourlyWeatherResult.data, 21)}</span>
                                <span className='Measure Text-bright'><i>°</i>C</span>
                            </div>
                        </div>
                    </div>
                }

                {getCurrentWeatherResult.data &&
                    <div className='More-infos' data-testid='more-infos'>
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>wind speed</span>
                            <span className='Value Text-bright'>{getCurrentWeatherResult.data.wind.speed} m/s</span>
                        </div>
                        {sunrise && 
                            <div className='Wrapper'>
                                <span className='Title Text-brighter'>sunrise</span>
                                <span className='Value Text-bright'>{sunrise}</span>
                            </div>
                        }
                        {sunset && 
                            <div className='Wrapper'>
                                <span className='Title Text-brighter'>sunset</span>
                                <span className='Value Text-bright'>{sunset}</span>
                            </div>
                        }
                        <div className='Wrapper'>
                            <span className='Title Text-brighter'>humidity</span>
                            <span className='Value Text-bright'>{getCurrentWeatherResult.data.main.humidity}%</span>
                        </div>
                    </div>
                }
            </motion.article>
        </main>
    );
}