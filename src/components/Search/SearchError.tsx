import { FC } from 'react';
import { useAsyncError } from 'react-router-dom';

export const SearchError: FC<Record<string, never>> = () => {
  const error = useAsyncError() as { message?: string };
  return <p>Error loading photos 😥! {error?.message}</p>;
};
