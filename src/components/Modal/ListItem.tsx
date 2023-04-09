import { FC, PropsWithChildren } from 'react';

export const ListItem: FC<PropsWithChildren<{ caption: string }>> = ({ caption, children }) => {
  return (
    <li>
      <strong>{caption}:</strong> {children}
    </li>
  );
};
