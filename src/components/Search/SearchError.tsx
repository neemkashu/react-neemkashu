import { FC } from 'react';
import { useAsyncError } from 'react-router-dom';

export const SearchError: FC<Record<string, never>> = () => {
  const error = useAsyncError() as { message?: string };
  return <p>Please contact me to get API KEY! Error loading photos 😥! {error?.message}</p>;
};
