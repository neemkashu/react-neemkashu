import React, { ChangeEventHandler } from 'react';
import { SEARCH_KEY } from '../utils/constants';
import { getFromStorage, setToStorage } from '../utils/helpers';
import './Search.css';

type SearchState = {
  searchValue: string;
};

export class Search extends React.Component<unknown, SearchState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      searchValue: getFromStorage(SEARCH_KEY),
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setToStorage(SEARCH_KEY, event.target.value);
    this.setState({
      searchValue: event.target.value,
    });
  };
  componentDidMount(): void {
    const previousSearch = getFromStorage(SEARCH_KEY);
    console.log('previousSearch', previousSearch);
    this.setState({
      searchValue: previousSearch,
    });
  }
  componentWillUnmount(): void {
    setToStorage(SEARCH_KEY, this.state.searchValue);
  }
  render() {
    return (
      <input
        onChange={this.handleInput}
        value={this.state.searchValue}
        className="input"
        placeholder="Search"
        type="search"
      />
    );
  }
}
