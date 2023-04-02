import { useMatches } from 'react-router-dom';
import { RoutesInfo } from '../../utils/constants';

const PAGE_ROUTE_DEPTH = 1;

export const useHeader = () => {
  const matches = useMatches();

  const title = Object.values(RoutesInfo).find(
    ({ path }) => path === matches[PAGE_ROUTE_DEPTH].pathname
  )?.header;

  return title;
};
