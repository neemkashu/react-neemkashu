import { About } from './components/About';
import { ErrorPage } from './components/ErrorPage';
import Header from './components/Header';
import { MainContent } from './components/MainContent';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const routesConfig = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/',
        element: <MainContent />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];
