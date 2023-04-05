import { FC, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FORM_SEARCH_KEY, Search } from './Search';

type SearchField = Record<typeof FORM_SEARCH_KEY, string>;

export const SearchForm: FC<Record<string, never>> = () => {
  const { register, handleSubmit } = useForm<SearchField>({
    mode: 'onSubmit',
  });

  const onSubmit = (formData: SearchField): void => {
    console.log('Search!', formData.searchText);
  };

  return (
    <form
      name=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row flex-wrap jus tiny:flex-nowrap gap-2 p-1 tiny:p-3 h-min w-min
      border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
    >
      <Search register={register(FORM_SEARCH_KEY)} />
      <button
        className=" self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
          duration-300 ease-in-out"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
