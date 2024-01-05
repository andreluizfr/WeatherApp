import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as fs from 'fs';
import * as path from 'path';

import WeatherPage from '.';

import getCurrentWeather from '@services/getCurrentWeather';
import getHourlyWeather from '@services/getHourlyWeather';

interface WeatherService {
    city: string | null,
    state?: string | null,
    country?: string | null
}

jest.mock('@services/getCurrentWeather', () => ({
    __esModule: true,
    default: jest.fn((_props: WeatherService) => {
        return new Promise((_resolve, reject)=>{
            reject({
                httpStatusCode: 500,
                message: "erro qualquer"
            });
        });
    }),
}));

jest.mock('@services/getHourlyWeather', () => ({
    __esModule: true,
    default: jest.fn((_props: WeatherService) => {
        return new Promise((_resolve, reject)=>{
            reject({
                httpStatusCode: 500,
                message: "erro qualquer"
            });
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

    test('error api request', async () => {

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
            const error = {
                httpStatusCode: 500,
                message: "erro qualquer"
            };
            await expect(getCurrentWeather({city: 'Dallol'})).rejects.toEqual(error);
            await expect(getHourlyWeather({city: 'Dallol'})).rejects.toEqual(error);
        });

        await waitFor(async () => {
            //it must have header back icon
            const backIcon = screen.getByTestId('back-icon');
            expect(backIcon).toBeVisible();

            //it must have page title equals to the city selected
            const pageTitle = screen.getByTestId('page-title');
            expect(pageTitle).toHaveTextContent('DALLOL');
            expect(pageTitle).toBeVisible();

            const pageSubTitle = screen.findByTestId('page-subtitle');
            expect(pageSubTitle).toHaveTextContent('unknown');
            expect(pageSubTitle).toBeVisible();

            const errorMessage = screen.findByTestId('error-message');
            expect(errorMessage).toHaveTextContent('Error, please try again later.');
            expect(errorMessage).toBeVisible();

            const previsions = screen.queryByTestId('previsions');
            expect(previsions).toBeNull();

            const moreInfos = screen.queryByTestId('more-infos');
            expect(moreInfos).toBeNull();

        }, { timeout: 10000 });

    }, 15000);

});