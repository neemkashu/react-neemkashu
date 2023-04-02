import { PropsWithChildren } from 'react';

export const CardGrid = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid justify-center gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-min">
      {children}
    </div>
  );
};
