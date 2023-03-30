import { useMatches } from 'react-router-dom';
import { RoutesInfo } from '../../src/utils/constants';
import { NavigationBar } from './NavigationBar';

const PAGE_ROUTE_DEPTH = 1;

const Header = () => {
  const matches = useMatches();
  const title = Object.values(RoutesInfo).find(
    ({ path }) => path === matches[PAGE_ROUTE_DEPTH].pathname
  )?.header;

  return (
    <header className="flex justify-between items-center pr-2 bg-orange-400">
      <NavigationBar />
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
