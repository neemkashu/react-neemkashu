import React, { CSSProperties } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

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
  width: '100%',
  backgroundColor: 'orange',
};

class App extends React.Component {
  render() {
    return (
      <>
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
        </nav>
        <Outlet />
      </>
    );
  }
}

export default App;
