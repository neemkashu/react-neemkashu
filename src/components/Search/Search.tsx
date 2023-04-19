import { FC } from 'react';
import { useSelector } from 'react-redux';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '../../styles/Search.module.css';
import { selectSearchText } from '../../redux/store';

export const FORM_SEARCH_KEY = 'searchText';

export const Search: FC<{ register: UseFormRegisterReturn<typeof FORM_SEARCH_KEY> }> = ({
  register,
}) => {
  const searchValue = useSelector(selectSearchText);
  const { onChange } = register;

  return (
    <input
      {...register}
      onChange={onChange}
      defaultValue={searchValue}
      className={`${styles.input} m-0 rounded-2xl border-2 border-solid border-yellow-900
          max-w-xs h-10 pl-8 pr-2 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-200
          focus-visible:bg-yellow-200 focus-visible:outline-0`}
      placeholder="Search"
      type="search"
    />
  );
};
