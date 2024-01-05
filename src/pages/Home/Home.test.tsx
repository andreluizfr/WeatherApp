import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '.';

import * as fs from 'fs';
import * as path from 'path';

Object.defineProperty(window, 'location', {
    value: { href: 'http://localhost/', hostname: 'http://localhost' } as Location,
});

//exemplo abaixo também permite que window.location possa ser modificado
/*
Object.defineProperty(window.location, 'reload', {
    configurable: true,
});
window.location.reload = jest.fn();
*/

jest.mock('react-router-dom', () => ({ 
    __esModule: true,
    useNavigate: jest.fn(() => {
        return ({pathname,search}: {pathname: string, search: string}) => {
            window.location.href = window.location.hostname + pathname + search;
        }
    })
}));

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

        expect(window.location.href).toEqual('http://localhost/');

        await waitFor(() => {
            fireEvent.click(cityList.childNodes[0] as HTMLDivElement);
            expect(window.location.href).toEqual('http://localhost/weather?city=Dallol');
        }, { timeout: 2000 });
    
    }, 5000);

});