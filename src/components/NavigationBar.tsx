import { NavLink } from 'react-router-dom';
import { RoutesInfo } from '../utils/constants';

export const NavigationBar = () => {
  return (
    <nav className="flex justify-between py-2 px-1 sm:px-2">
      <ul className="flex flex-row gap-2 m-0 p-0">
        {Object.entries(RoutesInfo).map(([key, details]) => {
          if (details.path === RoutesInfo.NOT_FOUND.path) return null;

          return (
            <li key={key}>
              <NavLink
                className="p-1 duration-300 ease-in-out"
                to={details.path}
              >
                {details.header}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
