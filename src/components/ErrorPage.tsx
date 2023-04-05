import { FC } from 'react';

export const ErrorPage: FC<Record<string, never>> = () => {
  return (
    <div className="my-1 mx-auto">
      <p className="text-center text-2xl">Oops!</p>
      <p className="text-center text-1xl">Page not found</p>
    </div>
  );
};
