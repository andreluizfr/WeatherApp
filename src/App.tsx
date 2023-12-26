import { lazy, Suspense } from 'react';

import LoadingPage from "@pages/Loading";
const HomePage = lazy(() => import('@pages/Home'));
const WeatherPage = lazy(() => import('@pages/Weather'));
const NotFoundPage = lazy(() => import('@pages/NotFound'));

import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";


function Router() {

    return (
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
                        element: <NotFoundPage/>,
                    }
                ])
            }/> 
        </Suspense>
    );
}

export default Router;