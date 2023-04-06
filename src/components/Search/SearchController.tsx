import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData, LoaderFunction } from 'react-router-dom';
import { FlickrData, getCards } from '../../api/getCards';
import { SearchForm } from './SearchForm';
import { CardGrid } from '../../layouts/CardGrid';
import { SearchError } from './SearchError';
import { PhotoCardSmall } from '../Cards/PhotoCardSmall';
import { SEARCH_KEY } from '../../utils/constants';

export const photoLoader: LoaderFunction = () => {
  const searchQuery = localStorage.getItem(SEARCH_KEY);
  const cardsRow = getCards(searchQuery ?? '');

  return defer({
    cards: cardsRow,
  });
};

export const SearchController: FC<Record<string, never>> = () => {
  const data = useLoaderData() as { cards: FlickrData | null };

  return (
    <main>
      <div className="flex flex-col items-center gap-2 sm:p-3 p-2">
        <div className="self-center sm:self-start">
          <SearchForm />
        </div>
        <CardGrid>
          <Suspense fallback={<p>Loading photos...</p>}>
            <Await
              resolve={data.cards}
              errorElement={<SearchError />}
            >
              {(dataRaw: FlickrData): JSX.Element[] => {
                return dataRaw.photos.photo.map((card) => (
                  <PhotoCardSmall
                    key={card.id}
                    {...card}
                  />
                ));
              }}
            </Await>
          </Suspense>
        </CardGrid>
      </div>
    </main>
  );
};
