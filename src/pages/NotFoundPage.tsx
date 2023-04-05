import { FC } from 'react';
import { ErrorPage } from '../components/ErrorPage';

export const NotFoundPage: FC<Record<string, never>> = () => {
  return <ErrorPage />;
};
