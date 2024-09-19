import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '../pages';

const MainPage = React.lazy(() => import('../pages/main-page/main-page'));
const InfoPage = React.lazy(() => import('../pages/info-page/info-page'));
const NotFoundPage = React.lazy(() => import('../pages/not-found-page/not-found-page'));
const App = React.lazy(() => import('../App'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'coins/:id',
        element: <InfoPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
