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
        value={searchState.searchValue}
        type="text"
        className="search__field"
        placeholder="What are you looking for?"
      />
      <button type="submit" className="search__btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}
