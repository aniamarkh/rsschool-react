import React, { useState, useEffect, FormEvent, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchState, setSearchState] = useState<string>(localStorage.getItem('search') || '');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    if (input) {
      setSearchState(input.value);
      onSearch(input.value);
      localStorage.setItem('value', input.value);
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

  const inputField = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        defaultValue={searchState}
        type="text"
        className="search__field"
        placeholder="What movie are you looking for?"
        ref={inputField}
      />
      <button type="submit" className="search__btn">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}
