import React, { useState, useEffect, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchState, setSearchState] = useState<string>(localStorage.getItem('search') || '');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    if (input) {
      const inputValue = input.value;
      setSearchState(inputValue);
      onSearch(inputValue);
      localStorage.setItem('value', inputValue);
    }
  };

  useEffect(() => {
    localStorage.setItem('search', searchState);
  }, [searchState]);

  useEffect(() => {
    const localSearchValue = localStorage.getItem('search');
    if (localSearchValue) {
      setSearchState(localSearchValue);
    }
  }, []);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        defaultValue={searchState}
        type="text"
        className="search__field"
        placeholder="What movie are you looking for?"
      />
      <button type="submit" className="search__btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}
