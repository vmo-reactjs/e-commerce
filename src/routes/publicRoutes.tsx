import MainLayout from '@/layouts/MainLayout';
import { RouteObject } from 'react-router';
import Collection from '../pages/Collection';
import Home from '../pages/Home';

const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/collections',
        element: <Collection />,
      },
    ],
  },
];

export { publicRoutes };