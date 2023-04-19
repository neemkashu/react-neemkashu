import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FORM_SEARCH_KEY, Search } from './Search';
import { Spinner } from '../Spinner';
import { ButtonSubmit } from '../Buttons/Buttons';
import { updateSearchText } from '../../redux/photoSlice';
import { useGetPhotosByQuery } from '../../api/flickrApi';
import { selectSearchText } from '../../redux/store';

type SearchField = Record<typeof FORM_SEARCH_KEY, string>;

export const SearchForm: FC<Record<string, never>> = () => {
  const { register, handleSubmit } = useForm<SearchField>({
    mode: 'onSubmit',
  });
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const { isFetching } = useGetPhotosByQuery(searchText);

  const onSubmit = (formData: SearchField): void => {
    dispatch(updateSearchText(formData.searchText));
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
      <ButtonSubmit disabled={isFetching}>{isFetching ? <Spinner /> : 'Search'}</ButtonSubmit>
    </form>
  );
};
