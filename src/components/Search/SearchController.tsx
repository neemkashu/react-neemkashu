import { FC, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { FlickrData } from '../../api/getCards';
import { SearchForm } from './SearchForm';
import { CardGrid } from '../../layouts/CardGrid';
import { SearchError } from './SearchError';
import { PhotoCards } from './PhotoCards';

export const SearchController: FC<Record<string, never>> = () => {
  const data = useLoaderData() as { cards: FlickrData | null };

  return (
    <main>
      <div className="flex flex-col items-center gap-2 sm:p-3 p-2">
        <Suspense fallback={<p>Loading main page...</p>}>
          <Await
            resolve={data.cards}
            errorElement={<SearchError />}
          >
            <div className="self-center sm:self-start flex flex-row items-center gap-2">
              <SearchForm />
            </div>
            <CardGrid>
              <PhotoCards />
            </CardGrid>
          </Await>
        </Suspense>
      </div>
    </main>
  );
};
