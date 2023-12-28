import './styles.css';
import { PiMoonLight } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { BsCloudSnow } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { BsCloudRain } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { WiDayCloudy } from "react-icons/wi";
import { RiQuestionMark } from "react-icons/ri";
import { BsCloudFog2 } from "react-icons/bs";

import { WeatherType } from '@entities/WeatherType';

import { memo } from 'react';

const WeatherIcon = ({weather}: {weather: WeatherType | undefined}) => {
    switch(weather){
        case "sunny": return <GoSun className='Weather-icon Icon' data-testid='current-weather-sunny'/> 
        case "starry": return <PiMoonLight className='Weather-icon Icon' data-testid='current-weather-starry'/>
        case "rainy": return <BsCloudRain className='Weather-icon Icon' data-testid='current-weather-rainy'/>
        case "snowy": return <BsCloudSnow className='Weather-icon Icon' data-testid='current-weather-snowy'/>
        case "cloudy-day": return <WiDayCloudy className='Weather-icon Icon' data-testid='current-weather-cloudy-day'/>
        case "cloudy-night": return <IoCloudyNightOutline className='Weather-icon Icon' data-testid='current-weather-cloudy-night'/>
        case "thundery": return <BsCloudLightningRain className='Weather-icon Icon' data-testid='current-weather-thundery'/>
        case "fog": return <BsCloudFog2 className='Weather-icon Icon' data-testid='current-weather-fog'/>
        default: return <RiQuestionMark className='Weather-icon Icon' data-testid='current-weather-unknown'/>
    }
}

const WeatherIconMemoized = memo(WeatherIcon);

export default WeatherIconMemoized;