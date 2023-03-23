import { Creator } from '../components/CardCreator/Creator';
import Header from '../components/Header';
import { RoutesInfo } from '../utils/constants';

export const FormPage = () => {
  return (
    <>
      <Header title={RoutesInfo.FORM.header} />
      <Creator />
    </>
  );
};
