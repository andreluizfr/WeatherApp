import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '.';
import * as fs from 'fs';
import * as path from 'path';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

beforeEach((): void => {
    jest.setTimeout(20000);
});

afterEach(cleanup);

describe('HomePage', () => {

    test('elements rendering', async () => {

        //aplicando css no DOM
        const cssFile = fs.readFileSync(
            path.resolve(__dirname, './styles.css'),
            'utf8'
        );
        const { container } = render(<HomePage />);
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('WEATHER');
        await waitFor(() => expect(expect(title).toBeVisible()), { timeout: 2000 });
        

        const subtitle = screen.getByTestId('subtitle');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveTextContent('select a city');
        await waitFor(() => expect(expect(subtitle).toBeVisible()), { timeout: 2000 });
        

        const logo = screen.getByTestId('logo');
        expect(logo).toBeInTheDocument();
        await waitFor(() => expect(expect(logo).toBeVisible()), { timeout: 2000 });

        const cityList = screen.getByTestId('cities-wrapper');
        expect(cityList).toBeInTheDocument();
        expect(cityList.childNodes.length === 6);
        expect(cityList.childNodes[0] as HTMLDivElement).toHaveTextContent("Dallol");
        expect(cityList.childNodes[1] as HTMLDivElement).toHaveTextContent("Fairbanks");
        expect(cityList.childNodes[2] as HTMLDivElement).toHaveTextContent("London");
        expect(cityList.childNodes[3] as HTMLDivElement).toHaveTextContent("Recife");
        expect(cityList.childNodes[4] as HTMLDivElement).toHaveTextContent("Vancouver");
        expect(cityList.childNodes[5] as HTMLDivElement).toHaveTextContent("Yakutsk");
        
        cityList.childNodes.forEach(async (city)=>{
            await waitFor(() => expect(expect(city).toBeVisible()), { timeout: 2000 });
        });
    
    });

});