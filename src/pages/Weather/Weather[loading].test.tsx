import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherPage from '.';

import * as fs from 'fs';
import * as path from 'path';

import * as currentWeatherMock from '@data/currentWeatherMock.json';
import * as hourlyWeatherMock from '@data/hourlyWeatherMock.json';

jest.mock('@services/GetCurrentWeather', () => ({
    __esModule: true,
    default: jest.fn((_city: string) => {
        return new Promise(resolve=>{
            resolve(currentWeatherMock);
        });
    }),
}));

jest.mock('@services/GetHourlyWeather', () => ({
    __esModule: true,
    default: jest.fn((_city: string) => {
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

jest.mock('react-router-dom', () => ({ 
    __esModule: true,
    useNavigate: () => {
        return (_path: string | number) => {}
    },
    useSearchParams: () => {
        const searchParams = {
            get: (_param: string) => {
                return 'dallol';
            }
        }
        return [searchParams];
    }
}));


describe('WeatherPage', () => {

    test('loading api request', async () => {

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

        //it must have initially a loader
        await waitFor(async () => {
            const loader = await screen.findByTestId('loader');
            expect(loader).toBeVisible();
        }, { timeout: 1000 });

        //the loader must have gone at most 2 sec later
        await waitFor(async () => {
            const loader = screen.queryByTestId('loader');
            expect(loader).toBeNull();
        }, { timeout: 2000 });

    }, 5000);

});