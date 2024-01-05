import './styles.css';
import { PiSmileySadLight } from "react-icons/pi";
import BackBar from '@components/BackBar';
import { lazy } from 'react';

function NotFoundPage(): JSX.Element {

    return (
        <div className='NotFoundPage'>
            <BackBar />
            <main className='Container'>
                <PiSmileySadLight className='Sad-face-icon' />
                <h1 className='Title'>
                    Page Not Found
                </h1>
                <h2 className='Subtitle'>
                    We couldn't find the page you are looking for.
                </h2>
            </main>
        </div>
    );
}

const waitSomeTime = () => {
    return new Promise<string>(resolve => {
        setTimeout(() => {
            resolve('');
        }, 1000);
    });
};
  
const NotFoundPageCointainer = lazy(() => waitSomeTime().then(() => ({ default: () => <NotFoundPage />})));

export default NotFoundPageCointainer;
  
