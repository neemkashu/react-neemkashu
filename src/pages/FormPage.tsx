import { PetForm } from '../components/Form/PetForm';
import Header from '../components/Header';
import { CardGrid } from '../layouts/CardGrid';
import { RoutesInfo } from '../utils/constants';

export const FormPage = () => {
  return (
    <>
      <Header title={RoutesInfo.FORM.header} />
      <div className="flex flex-col lg:flex-row">
        <PetForm />
        <CardGrid>{'cards'}</CardGrid>
      </div>
    </>
  );
};
