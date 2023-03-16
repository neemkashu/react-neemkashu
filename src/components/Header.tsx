import { Component, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import './styles//Header.css';

const ulStyle: CSSProperties = {
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  margin: 0,
  padding: 5,
};
const linkStyle: CSSProperties = {
  padding: '0.2rem',
};

const navStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.8rem',
  backgroundColor: 'orange',
};

type HeaderProps = {
  title: string;
};

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }
  render() {
    return (
      <header>
        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li>
              <NavLink style={linkStyle} to={`/`}>
                Main page
              </NavLink>
            </li>
            <li>
              <NavLink style={linkStyle} to={`/about`}>
                About
              </NavLink>
            </li>
          </ul>
          <h1>{this.props.title}</h1>
        </nav>
      </header>
    );
  }
}

export default Header;
