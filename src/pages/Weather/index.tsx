import './styles.css';

import TodayTemperature from './TodayTemperature';
import Previsions from './Previsions';
import MoreInfos from './MoreInfos';

import { City } from '@entities/City';

import LoadingPage from "@pages/Loading";

import BackBar from '@components/BackBar';
import WeatherIcon from '@components/WeatherIcon';

import useWeatherData from '@hooks/useWeatherData';
import useDateTime from '@hooks/useDateTime';

import GetCurrentWeather from '@services/GetCurrentWeather';
import GetHourlyWeather from '@services/GetHourlyWeather';

import rewriteWeatherType from '@utils/rewriteWeatherType';

import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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

    if(getCurrentWeatherResult.isLoading || getHourlyWeatherResult.isLoading) return <LoadingPage/>;
    
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
                
                <TodayTemperature weatherData={weatherData} />
                
                <WeatherIcon weather={weatherData?.weather} />

                {(getHourlyWeatherResult.error || getHourlyWeatherResult.error)?
                    <p className='Text' data-testid='error-message'>Error, please try again later.</p>
                    :
                    <></>
                }
                
                <Previsions weatherData={weatherData} />

                <MoreInfos weatherData={weatherData}/>

            </motion.article>

            {dateTime &&
                <span className='CityTime Text'>{dateTime.toLocaleTimeString()}</span>
            }
        </main>
    );
}