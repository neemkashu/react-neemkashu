import { FC } from 'react';

export const About: FC<Record<string, never>> = () => {
  return (
    <div className="sm:p-2 p-1">
      <h2 className="font-bold text-yellow-800 text-2xl">React app created with Vite</h2>
    </div>
  );
};
