import { FC } from 'react';
import { useNavigation, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FORM_SEARCH_KEY, Search } from './Search';
import { Spinner } from '../Spinner';
import { ButtonSubmit } from '../Buttons/Buttons';

type SearchField = Record<typeof FORM_SEARCH_KEY, string>;

export const SearchForm: FC<Record<string, never>> = () => {
  const { register, handleSubmit } = useForm<SearchField>({
    mode: 'onSubmit',
  });
  const submit = useSubmit();
  const isLoading = useNavigation().state !== 'idle';

  const onSubmit = (formData: SearchField): void => {
    submit(formData, { method: 'post', action: '/' });
  };

  return (
    <form
      name=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row flex-wrap justify-center tiny:flex-nowrap gap-2 p-1 tiny:p-3 h-min w-min
      border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
    >
      <Search register={register(FORM_SEARCH_KEY)} />
      <ButtonSubmit disabled={isLoading}>{isLoading ? <Spinner /> : 'Search'}</ButtonSubmit>
    </form>
  );
};
