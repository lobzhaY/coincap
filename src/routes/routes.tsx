import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { ErrorPage, InfoPage, MainPage } from '../pages';

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
        path: ':id',
        element: <InfoPage />,
      },
    ],
  },
]);
