import React, { ChangeEventHandler } from 'react';
import { SEARCH_KEY } from '../utils/constants';
import './styles/Search.css';

type SearchState = {
  searchValue: string;
};

export class Search extends React.Component<unknown, SearchState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem(SEARCH_KEY) ?? '',
    };
  }
  handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };
  componentWillUnmount(): void {
    localStorage.setItem(SEARCH_KEY, this.state.searchValue ?? '');
  }
  render() {
    return (
      <input
        onChange={this.handleInput}
        defaultValue={this.state.searchValue ?? ''}
        className="input"
        placeholder="Search"
        type="search"
      />
    );
  }
}
