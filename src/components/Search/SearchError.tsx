import { FC } from 'react';

export const SearchError: FC<Record<string, never>> = () => {
  return <p>Error loading photos 😥!</p>;
};
