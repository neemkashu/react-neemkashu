import { useLocation } from 'react-router-dom';
import { RoutesInfo } from '../../utils/constants';

export const useHeader = (): string => {
  const matches = useLocation();

  const title = Object.values(RoutesInfo).find(({ path }) => path === matches.pathname)?.header;

  return title ?? '';
};
