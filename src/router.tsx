import { lazy, Suspense, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

import LoadingPage from "@pages/Loading";
const HomePage = lazy(() => import('@pages/Home'));
const WeatherPage = lazy(() => import('@pages/Weather'));
import NotFoundPage from '@pages/NotFound';

function Router() {

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <ErrorBoundary fallback={<p>{errorMessage}</p>} onError={(error: Error, _info: React.ErrorInfo) => setErrorMessage(error.message)}>
            <Suspense fallback={<LoadingPage/>}>
                <RouterProvider router={
                    createBrowserRouter([
                        {
                            path: "/",
                            element: <HomePage/>,
                        },
                        {
                            path: "/weather",
                            element: <WeatherPage/>,
                        },
                        {
                            path: "*",
                            element: <NotFoundPage />,
                        }
                    ])
                }/> 
            </Suspense>
        </ErrorBoundary>
    );
}

export default Router;