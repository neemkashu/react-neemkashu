import { FC } from 'react';

export const Spinner: FC<Record<string, never>> = () => {
  return (
    <div
      className="animate-spin rounded-full border-dashed border-2 w-5 h-5"
      data-testid="spinner"
    />
  );
};
