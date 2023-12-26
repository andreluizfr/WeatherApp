import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherPage from '.';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('@services/GetCurrentWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: false,
        loaded: false,
        data: null,
        isError: true,
        error: {
            httpStatusCode: 500,
            message: "erro qualquer"
        }
      };
    },
}));

jest.mock('@services/GetHourlyWeather', () => ({
    __esModule: true,
    default: (_city: string) => {
      return {
        isLoading: false,
        loaded: false,
        data: null,
        isError: true,
        error: {
            httpStatusCode: 500,
            message: "erro qualquer"
        }
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

        const loader = screen.queryByTestId('loader');
        expect(loader).toBeNull();

        const backIcon = screen.getByTestId('back-icon');
        expect(backIcon).toBeInTheDocument();
        expect(backIcon).toBeVisible();

        const pageTitle = screen.getByTestId('page-title');
        expect(pageTitle).toHaveTextContent('DALLOL');
        await waitFor(() => expect(expect(pageTitle).toBeVisible()), { timeout: 2000 });

        const pageSubTitle = screen.getByTestId('page-subtitle');
        expect(pageSubTitle).toHaveTextContent('unknown');
        await waitFor(() => expect(expect(pageSubTitle).toBeVisible()), { timeout: 2000 });

        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toHaveTextContent('Error, please try again later.');
        await waitFor(() => expect(expect(errorMessage).toBeVisible()), { timeout: 2000 });

        const previsions = screen.queryByTestId('previsions');
        expect(previsions).toBeNull();

        const moreInfos = screen.queryByTestId('more-infos');
        expect(moreInfos).toBeNull();

    });

});