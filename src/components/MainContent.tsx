import { FC } from 'react';
import { cards } from '../utils/mocha';
import { CardGrid } from '../layouts/CardGrid';
import { Card } from './Card';
import { SearchForm } from './Search/SearchForm';
import { SearchController } from './Search/SearchController';

export const MainContent: FC<Record<string, never>> = () => {
  return (
    <div className="flex flex-col items-center gap-2 sm:p-3 p-2">
      <SearchController />
      <div className="self-center sm:self-start">
        <SearchForm />
      </div>
      <CardGrid>
        {cards.map((card, index) => {
          const key = `${index}-${card.name}-${card.breed}`;
          return (
            <Card
              key={key}
              {...card}
            />
          );
        })}
      </CardGrid>
    </div>
  );
};
