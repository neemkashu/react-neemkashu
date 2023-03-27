import { ErrorPage } from '../components/ErrorPage';
import Header from '../components/Header';
import { RoutesInfo } from '../utils/constants';

export const NotFoundPage = () => {
  return (
    <>
      <Header title={RoutesInfo.NOT_FOUND.header} />
      <ErrorPage />
    </>
  );
};
