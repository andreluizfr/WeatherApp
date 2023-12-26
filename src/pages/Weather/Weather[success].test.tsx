import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherPage from '.';
import * as fs from 'fs';
import * as path from 'path';
import * as currentWeatherMock from '../../data/currentWeatherMock.json';
import * as hourlyWeatherMock from '../../data/hourlyWeatherMock.json';

jest.mock('@services/GetCurrentWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: false,
        loaded: true,
        data: currentWeatherMock,
        isError: false,
        error: null,
      };
    },
}));

jest.mock('@services/GetHourlyWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: false,
        loaded: true,
        data: hourlyWeatherMock,
        isError: false,
        error: null,
      };
    },
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

    beforeEach((): void => {
        jest.setTimeout(20000);
    });

    afterEach(() => {
        cleanup();
    });

    it('successful api request', async () => {

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

        //it must not have loader
        const loader = screen.queryByTestId('loader');
        expect(loader).toBeNull();
        
        //it must have header back icon
        const backIcon = screen.getByTestId('back-icon');
        expect(backIcon).toBeInTheDocument();
        expect(backIcon).toBeVisible();

        //it must have page title equals to the city selected
        const pageTitle = screen.getByTestId('page-title');
        expect(pageTitle).toHaveTextContent('DALLOL');
        await waitFor(() => expect(expect(pageTitle).toBeVisible()), { timeout: 2000 });
        
        //it must have page subtitle equals to the current weather
        const pageSubTitle = screen.getByTestId('page-subtitle');
        //expect(pageSubTitle).toHaveTextContent('sunny');
        await waitFor(() => expect(expect(pageSubTitle).toBeVisible()), { timeout: 2000 });
        
        //test if current temperature is correct', async ()=> {
        const currentTemperature = screen.getByTestId('current-temperature');
        expect(currentTemperature).toHaveTextContent('29.8');
        await waitFor(() => expect(currentTemperature).toBeVisible(), { timeout: 2000 });

        //it must not have error message
        const errorMessage = screen.queryByTestId('error-message');
        expect(errorMessage).toBeNull();
        
        //test if max temperature is correct
        const maxCurrentTemperature = screen.getByTestId('max-current-temperature');
        expect(maxCurrentTemperature).toHaveTextContent('30°');
        await waitFor(() => expect(maxCurrentTemperature).toBeVisible(), { timeout: 2000 });

        //test if min temperature is correct
        const minCurrentTemperature = screen.getByTestId('min-current-temperature');
        expect(minCurrentTemperature).toHaveTextContent('30°');
        await waitFor(() => expect(minCurrentTemperature).toBeVisible(), { timeout: 2000 });
        

        //test if icon of the current weather is the correct one
        //const currentWeatherIcon = screen.getByTestId('current-weather-sunny');
        //expect(currentWeatherIcon).toBeInTheDocument();
        //await waitFor(() => expect(currentWeatherIcon).toBeVisible(), { timeout: 2000 });
        
        //test if dawn prevision correct
        const dawnPrevision = screen.getByTestId('dawn-prevision');
        expect(dawnPrevision).toHaveTextContent('27');
        await waitFor(() => expect(dawnPrevision).toBeVisible(), { timeout: 2000 });
        
        //test if morning prevision correct
        const morningPrevision = screen.getByTestId('morning-prevision');
        expect(morningPrevision).toHaveTextContent('36');
        await waitFor(() => expect(morningPrevision).toBeVisible(), { timeout: 2000 });
        

        //test if afternoon prevision correct
        const afternoonPrevision = screen.getByTestId('afternoon-prevision');
        expect(afternoonPrevision).toHaveTextContent('35');
        await waitFor(() => expect(afternoonPrevision).toBeVisible(), { timeout: 2000 });
        
        
        //test if night prevision correct
        const nightPrevision = screen.getByTestId('night-prevision');
        expect(nightPrevision).toHaveTextContent('31');
        await waitFor(() => expect(nightPrevision).toBeVisible(), { timeout: 2000 });
        
    });

});