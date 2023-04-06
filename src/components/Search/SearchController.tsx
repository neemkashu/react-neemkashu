import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { FlickrData, getCards } from '../../api/getCards';
import { SearchForm } from './SearchForm';
import { CardGrid } from '../../layouts/CardGrid';
import { cards } from '../../utils/mocha';
import { Card } from '../Card';
import { SearchError } from './SearchError';

export function photoLoader(): ReturnType<typeof defer> {
  const cardsRow = getCards();

  return defer({
    cards: cardsRow,
  });
}

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
              {(photos: FlickrData): JSX.Element[] => {
                console.log('photos', `${photos}`);
                return cards.map((card, index) => {
                  const key = `${index}-${card.name}-${card.breed}`;
                  return (
                    <Card
                      key={key}
                      {...card}
                    />
                  );
                });
              }}
            </Await>
          </Suspense>
        </CardGrid>
      </div>
    </main>
  );
};
