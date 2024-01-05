import './styles.css';

import LoadingPage from "./Loading";
import TodayTemperature from './TodayTemperature';
import Previsions from './Previsions';
import MoreInfos from './MoreInfos';

import CurrentWeatherResponse from '@entities/CurrentWeatherResponse';
import HourlyWeatherResponse from '@entities/HourlyWeatherResponse';

import BackBar from '@components/BackBar';
import WeatherIcon from '@components/WeatherIcon';

import useWeatherData from '@hooks/useWeatherData';
import useDateTime from '@hooks/useDateTime';

import getCurrentWeather from '@services/geturrentWeather';
import getHourlyWeather from '@services/getourlyWeather';

import rewriteWeatherType from '@utils/rewriteWeatherType';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function WeatherPage(): JSX.Element {

    const [searchParams] = useSearchParams();
    const city = searchParams.get("city") || null;
    const state = searchParams.get("state") || null;
    const country = searchParams.get("country") || null;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<object | null>(null);
    const [currentWeatherResponse, setCurrentWeatherResponse] = useState<CurrentWeatherResponse | null>(null);
    const [hourlyWeatherResponse, setHourlyWeatherResponse]  = useState<HourlyWeatherResponse | null>(null);

    const weatherData = useWeatherData({ currentWeatherResponse, hourlyWeatherResponse });
    const dateTime = useDateTime({ currentWeatherResponse });
    const [secondsPassed, setSecondsPassed] = useState(0);

    function fetchAllPromises() {
        console.log('Fetching...');

        Promise.all([getCurrentWeather({city, state, country}), getHourlyWeather({city, state, country})])
            .then(([currentWeatherResponse, hourlyWeatherResponse])=>{
                setError(null);
                setCurrentWeatherResponse(currentWeatherResponse);
                setHourlyWeatherResponse(hourlyWeatherResponse);
            })
            .catch(error=>{
                setError(error);
                setCurrentWeatherResponse(null);
                setHourlyWeatherResponse(null);
                setIsLoading(false);
            });

        setSecondsPassed(_prev=>0);
    }

    useEffect(()=> {
        console.log("mounting page...");
        return () => console.log("unmounting page...");
    }, []);

    useEffect(()=> {
        setIsLoading(true);
        fetchAllPromises();
        setSecondsPassed(0);
    }, [searchParams]);

    useEffect(()=>{
        if(weatherData){
            const weatherPageElement = document.getElementsByClassName("WeatherPage")[0];
            weatherPageElement.setAttribute("weather", weatherData.weather);
            setIsLoading(false);
        }
    }, [weatherData]);

    useEffect(()=>{
        if(dateTime){
            if(secondsPassed >= 30){
                fetchAllPromises();
            } else {
                setSecondsPassed(prev=>prev+1);
            }
        }
    }, [dateTime]);

    return (
        <main className='WeatherPage' data-testid="weather-page">
        {isLoading ? 
            <LoadingPage/>
            :
            <>
                <BackBar />

                <motion.article 
                    className='Weather-container'
                    initial={{ x: window.innerWidth/2, opacity: 0}}
                    animate={{x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6}}}
                >

                    <div className='Title-wrapper'>
                        <h1 className='Title Text' data-testid="page-title">{city?.toUpperCase()}</h1>
                        <h2 className='Subtitle Text-bright' data-testid="page-subtitle">{rewriteWeatherType(weatherData?.weather)}</h2>
                    </div>
                    
                    <TodayTemperature weatherData={weatherData} />
                    
                    <WeatherIcon weather={weatherData?.weather} />

                    {error &&
                        <p className='Text' data-testid='error-message'>Error, please try again later.</p>
                    }
                    
                    <Previsions weatherData={weatherData} />

                    <MoreInfos weatherData={weatherData}/>

                </motion.article>

                {dateTime?
                    <span className='CityTime Text'>{dateTime.toLocaleTimeString()}</span>
                    :
                    <>.</>
                }
            </>
        }
        </main>
    );
}