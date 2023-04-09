import { FC } from 'react';

export const Spinner: FC<{ size: string }> = ({ size }) => {
  return (
    <div
      className="animate-spin rounded-full border-dashed border-2"
      style={{ width: size, height: size }}
      data-testid="spinner"
    />
  );
};
