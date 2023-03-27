import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesInfo } from '../../src/utils/constants';

type HeaderProps = {
  title: string;
};
// TODO: refactor routes and links into constants when hooks will be allowed
class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }
  render() {
    return (
      <header className="flex justify-between items-center pr-2 bg-orange-400">
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
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}

export default Header;
