import Header from '../components/Header';
import { About } from '../components/About';
import { RoutesInfo } from '../utils/constants';

export const AboutPage = () => {
  return (
    <>
      <Header title={RoutesInfo.ABOUT.header} />
      <About />
    </>
  );
};
