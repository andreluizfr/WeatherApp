import './styles.css';

import PuffLoader from "react-spinners/PuffLoader";

export default function Loading() : JSX.Element {

    return(
        <div className='LoadingPage'>
            <PuffLoader
                className='Loader'
                color="rgb(255,255,255)"
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );

}