import React, { CSSProperties } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

const ulStyle: CSSProperties = {
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  margin: 0,
  padding: 5,
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
              <Link to={`/`}>Main page</Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </>
    );
  }
}

export default App;
