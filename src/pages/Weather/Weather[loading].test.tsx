import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherPage from '.';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('@services/GetCurrentWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: true,
        loaded: false,
        data: null,
        isError: false,
        error: null,
      };
    },
}));

jest.mock('@services/GetHourlyWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: true,
        loaded: false,
        data: null,
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

beforeEach((): void => {
    jest.setTimeout(20000);
});

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

        const pageTitle = screen.queryByTestId('weather-page');
        expect(pageTitle).toBeNull();

        const loader = screen.queryByTestId('loader');
        expect(loader).toBeInTheDocument();
        await waitFor(() => expect(expect(loader).toBeVisible()), { timeout: 2000 });

    });

});