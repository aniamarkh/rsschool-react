import React, { FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { searchAction } from '../../store/searchBarSlice';

export default function SearchBar() {
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    if (input) {
      dispatch(searchAction.setValue({ searchValue: input.value }));
    }
  };

  const inputField = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        defaultValue={searchState.searchValue}
        type="text"
        className="search__field"
        placeholder="What movie are you looking for?"
        ref={inputField}
        role="search-input"
      />
      <button type="submit" className="search__btn" role="search-submit">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
}
