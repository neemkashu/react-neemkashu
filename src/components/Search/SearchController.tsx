import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { FlickrData, getCards } from '../../api/getCards';

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
      <h1>Let&apos;s load some photos</h1>
      <Suspense fallback={<p>Loading photos...</p>}>
        <Await
          resolve={data.cards}
          errorElement={<p>Error loading package location!</p>}
        >
          {(cardsRow): JSX.Element => (
            <p>{`Your data: ${JSON.stringify(cardsRow)}`.slice(0, 30)}</p>
          )}
        </Await>
      </Suspense>
    </main>
  );
};
