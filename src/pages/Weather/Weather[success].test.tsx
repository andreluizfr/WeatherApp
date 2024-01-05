import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as fs from 'fs';
import * as path from 'path';

import * as currentWeatherMock from '@data/currentWeatherMock.json';
import * as hourlyWeatherMock from '@data/hourlyWeatherMock.json';

import WeatherPage from '.';

import HourlyWeatherResponse from '@entities/HourlyWeatherResponse';

import getCurrentWeather from '@services/geturrentWeather';
import getHourlyWeather from '@services/getourlyWeather';

import searchNextDayTemperature from '@utils/searchNextDayTemperature';
import getSunrise from '@utils/getSunrise';
import getSunset from '@utils/getSunset';
import getWeatherType from '@utils/getWeatherType';
import rewriteWeatherType from '@utils/rewriteWeatherType';

interface WeatherService {
    city: string | null,
    state?: string | null,
    country?: string | null
}

jest.mock('@services/getCurrentWeather', () => ({
    __esModule: true,
    default: jest.fn((_props: WeatherService) => {
        return new Promise(resolve=>{
            resolve(currentWeatherMock);
        });
    }),
}));

jest.mock('@services/getHourlyWeather', () => ({
    __esModule: true,
    default: jest.fn((_props: WeatherService) => {
        return new Promise(resolve=>{
            resolve(hourlyWeatherMock);
        });
    }),
}));

jest.mock('react-router-dom', () => ({ 
    __esModule: true,
    useNavigate: jest.fn(() => {
        return (_path: string | number) => {}
    }),
    useSearchParams: jest.fn(() => {
        const searchParams = {
            get: (_param: string) => {
                return 'dallol';
            }
        }
        return [searchParams];
    })
}));

describe('WeatherPage', () => {

    test('successful api request', async () => {

        //aplicando css no DOM
        const cssFile = fs.readFileSync(
            path.resolve(__dirname, './styles.css'),
            'utf8'
        );
        const { container } = render(<WeatherPage />);
        const style = document.createElement('style')
        style.type = 'text/css'; 
        style.innerHTML = cssFile;
        container.append(style);
        
        await act(async () => {
            expect(getCurrentWeather).toHaveBeenCalledTimes(1);
            expect(getHourlyWeather).toHaveBeenCalledTimes(1);
            await expect(getCurrentWeather({city: 'Dallol'})).resolves.toEqual(currentWeatherMock);
            await expect(getHourlyWeather({city: 'Dallol'})).resolves.toEqual(hourlyWeatherMock);
        });

        await waitFor(async () => {
            //it must have header back icon
            const backIcon = screen.getByTestId('back-icon');
            expect(backIcon).toBeVisible();

            //it must have page title equals to the city selected
            const pageTitle = screen.getByTestId('page-title');
            expect(pageTitle).toHaveTextContent('DALLOL');
            expect(pageTitle).toBeVisible();

            //it must have page subtitle equals to the current weather
            const sunriseString = getSunrise(currentWeatherMock);
            const sunsetString = getSunset(currentWeatherMock);
            const weatherType = getWeatherType(
                (currentWeatherMock.weather)[0].main,
                new Date(),
                currentWeatherMock.timezone,
                sunriseString,
                sunsetString
            );
            const pageSubTitle = screen.findByTestId('page-subtitle');
            expect(pageSubTitle).toHaveTextContent(rewriteWeatherType(weatherType));
            expect(pageSubTitle).toBeVisible();
            
            //test if icon of the current weather is the correct one
            const currentWeatherIcon = screen.findByTestId('current-weather-'+weatherType);
            expect(currentWeatherIcon).toBeInTheDocument();
            expect(currentWeatherIcon).toBeVisible();

            //test if current temperature is correct', async ()=> {
            const currentTemperature = screen.findByTestId('current-temperature');
            expect(currentTemperature).toHaveTextContent('29.8');
            expect(currentTemperature).toBeVisible();

            //it must not have error message
            const errorMessage = screen.queryByTestId('error-message');
            expect(errorMessage).toBeNull();

            //test if max temperature is correct
            const maxCurrentTemperature = screen.findByTestId('max-current-temperature');
            expect(maxCurrentTemperature).toHaveTextContent('30°');
            expect(maxCurrentTemperature).toBeVisible();

            //test if min temperature is correct
            const minCurrentTemperature = screen.getByTestId('min-current-temperature');
            expect(minCurrentTemperature).toHaveTextContent('30°');
            expect(minCurrentTemperature).toBeVisible();

            //test if dawn prevision correct
            const dawnPrevision = screen.findByTestId('dawn-prevision');
            expect(dawnPrevision).toHaveTextContent(searchNextDayTemperature(hourlyWeatherMock as unknown as HourlyWeatherResponse, 3));
            expect(dawnPrevision).toBeVisible();

            //test if morning prevision correct
            const morningPrevision = screen.findByTestId('morning-prevision');
            expect(morningPrevision).toHaveTextContent(searchNextDayTemperature(hourlyWeatherMock as unknown as HourlyWeatherResponse, 9));
            expect(morningPrevision).toBeVisible();
            
            //test if afternoon prevision correct
            const afternoonPrevision = screen.findByTestId('afternoon-prevision');
            expect(afternoonPrevision).toHaveTextContent(searchNextDayTemperature(hourlyWeatherMock as unknown as HourlyWeatherResponse, 15));
            expect(afternoonPrevision).toBeVisible();
            
            //test if night prevision correct
            const nightPrevision = screen.findByTestId('night-prevision');
            expect(nightPrevision).toHaveTextContent(searchNextDayTemperature(hourlyWeatherMock as unknown as HourlyWeatherResponse, 21));
            expect(nightPrevision).toBeVisible();

        }, { timeout: 10000 });

    }, 15000);

});