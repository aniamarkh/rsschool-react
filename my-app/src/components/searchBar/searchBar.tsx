import React, { useState, useEffect } from 'react';
import { SearchBarState } from 'types/types';

export default function SearchBar() {
  const [searchState, setSearchState] = useState<SearchBarState>({ searchValue: '' });

  useEffect(() => {
    const localSearchValue = localStorage.getItem('value');
    if (localSearchValue) {
      setSearchState({ searchValue: localSearchValue });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('value', searchState.searchValue);
  }, [searchState]);

  const handleInput = (value: string) => {
    setSearchState({ searchValue: value });
  };

  return (
    <div className="search">
      <input
        onChange={(e) => handleInput(e.currentTarget.value)}
        type="text"
        className="searchField"
        placeholder="What are you looking for?"
        value={searchState.searchValue}
      />
    </div>
  );
}
