import React from 'react';
import './Search.css';

export class Search extends React.Component {
  render() {
    return <input className="input" placeholder="Search" type="search" name="q" />;
  }
}
