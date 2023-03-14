import { About } from './components/About';
import { ErrorPage } from './components/ErrorPage';
import Header from './components/Header';
import { MainContent } from './components/MainContent';
import React from 'react';

export const routesConfig = [
  {
    path: '/',
    element: (
      <>
        <Header title={'Main Page'} />
        <MainContent />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Header title={'About Us'} />
        <About />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header title={'Not Found'} />
        <ErrorPage />
      </>
    ),
  },
];
