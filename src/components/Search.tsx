import { ChangeEventHandler, Component } from 'react';
import { SEARCH_KEY } from '../utils/constants';
import styles from '../styles/Search.module.css';

type SearchState = {
  searchValue: string;
};

export class Search extends Component<Record<string, never>, SearchState> {
  constructor(props: Record<string, never>) {
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
        className={`${styles.input} m-0 rounded-2xl border-2 border-solid border-yellow-900
          max-w-xs h-10 pl-8 pr-2 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-50
          focus-visible:bg-yellow-200 focus-visible:outline-0`}
        placeholder="Search"
        type="search"
      />
    );
  }
}
