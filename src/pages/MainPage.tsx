import Header from '../components/Header';
import { MainContent } from '../components/MainContent';
import { RoutesInfo } from '../utils/constants';

export const MainPage = () => {
  return (
    <>
      <Header title={RoutesInfo.MAIN.header} />
      <MainContent />
    </>
  );
};
