import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { SEARCH_KEY } from '../utils/constants';
import styles from '../styles/Search.module.css';

const getSearchFromStore = (): string => {
  return localStorage.getItem(SEARCH_KEY) ?? '';
};
export const Search: FC<Record<string, never>> = () => {
  const [searchValue, setSearchValue] = useState<string>(getSearchFromStore);
  const searchRef = useRef(searchValue);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    searchRef.current = inputValue;
  };

  useEffect(() => {
    return () => {
      localStorage.setItem(SEARCH_KEY, searchRef.current);
    };
  }, []);

  return (
    <input
      onChange={handleInput}
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
