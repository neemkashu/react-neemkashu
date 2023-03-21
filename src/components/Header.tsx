import { Component } from 'react';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  title: string;
};

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }
  render() {
    return (
      <header className="flex justify-between items-center pr-2 bg-orange-400">
        <nav className="flex justify-between py-1 px-4">
          <ul className="flex flex-row gap-2 m-0 p-1">
            <li>
              <NavLink className="p-1 duration-300 ease-in-out" to={`/`}>
                Main page
              </NavLink>
            </li>
            <li>
              <NavLink className="p-1 duration-300 ease-in-out" to={`/about`}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}

export default Header;
