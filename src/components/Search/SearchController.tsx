import { FC } from 'react';
import { useSelector } from 'react-redux';
import { SearchForm } from './SearchForm';
import { CardGrid } from '../../layouts/CardGrid';
import { SearchError } from './SearchError';
import { PhotoCards } from '../Cards/PhotoCards';
import { useGetPhotosByQuery } from '../../api/flickrApi';
import { selectSearchText } from '../../store';

export const SearchController: FC<Record<string, never>> = () => {
  const searchText = useSelector(selectSearchText);
  const { isError, isLoading } = useGetPhotosByQuery(searchText);

  return (
    <main>
      <div className="flex flex-col items-center gap-2 sm:p-3 p-2">
        <div className="self-center sm:self-start flex flex-row items-center gap-2">
          <SearchForm />
        </div>
        {isError ? <SearchError /> : null}
        {isLoading ? <p>Loading main page...</p> : null}
        {!isError && !isLoading ? (
          <CardGrid>
            <PhotoCards />
          </CardGrid>
        ) : null}
      </div>
    </main>
  );
};
