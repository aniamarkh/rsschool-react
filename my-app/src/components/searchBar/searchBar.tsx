import React from 'react';
import { SearchBarState } from 'types/types';

export default class SearchBar extends React.Component {
  state: SearchBarState = { searchValue: '' };

  componentDidMount() {
    const localSearchValue = localStorage.getItem('value');
    if (localSearchValue) {
      this.setState({
        searchValue: localSearchValue,
      });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('value', this.state.searchValue);
  }

  handleInput(value: string) {
    localStorage.setItem('value', this.state.searchValue);
    this.setState({ searchValue: value });
  }

  render() {
    const searchValue = this.state.searchValue;
    return (
      <div className="search">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleInput(e.currentTarget.value)
          }
          type="text"
          className="searchField"
          placeholder="What are you looking for?"
          value={searchValue}
        />
      </div>
    );
  }
}
