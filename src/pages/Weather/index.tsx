import './styles.css';

import { HiMiniArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";

import { City } from '@entities/City';

import LoadingPage from "@pages/Loading";

import BackBar from '@components/BackBar';

import GetCurrentWeather from '@services/GetCurrentWeather';
import GetHourlyWeather from '@services/GetHourlyWeather';

import rewriteWeatherType from '@utils/rewriteWeatherType';

import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from '@components/WeatherIcon';
import useWeatherData from '@hooks/useWeatherData';
import useDateTime from '@hooks/useDateTime';

export default function WeatherPage(): JSX.Element {

    const [searchParams] = useSearchParams();

    const getCurrentWeatherResult = GetCurrentWeather(searchParams.get("city") as City);
    const getHourlyWeatherResult = GetHourlyWeather(searchParams.get("city") as City);

    const weatherData = useWeatherData({
        currentWeatherResponse: getCurrentWeatherResult.data,
        hourlyWeatherResponse: getHourlyWeatherResult.data,
    });

    const dateTime = useDateTime({currentWeatherResponse: getCurrentWeatherResult.data})

    useEffect(()=>{
        if(weatherData) {
            const weatherPageElement = (document.getElementsByClassName("WeatherPage")[0] as HTMLElement);
            weatherPageElement?.setAttribute("weather", weatherData.weather); 
        }
    }, [weatherData]);

    if(getCurrentWeatherResult.isLoading || getHourlyWeatherResult.isLoading) return <LoadingPage/>
    
    return (
        <main className='WeatherPage' data-testid="weather-page">
            
            <BackBar />

            <motion.article 
                className='Weather-container'
                initial={{ x: window.innerWidth/2, opacity: 0}}
                animate={{x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6}}}
            >

                <div className='Title-wrapper'>
                    {searchParams && searchParams.get("city") &&
                        <h1 className='Title Text' data-testid="page-title">{searchParams.get("city")?.toUpperCase()}</h1>
                    }
                    <h2 className='Subtitle Text-bright' data-testid="page-subtitle">{rewriteWeatherType(weatherData?.weather)}</h2>
                </div>
                
                {weatherData &&
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
                }
                
                <WeatherIcon weather={weatherData?.weather} />

                {(getHourlyWeatherResult.error || getHourlyWeatherResult.error)?
                    <p className='Text' data-testid='error-message'>Error, please try again later.</p>
                    :
                    <></>
                }
                
                {weatherData &&
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
                }

                {weatherData &&
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
                }
            </motion.article>
            {dateTime &&
                <span className='CityTime Text'>{dateTime.toLocaleTimeString()}</span>
            }
        </main>
    );
}