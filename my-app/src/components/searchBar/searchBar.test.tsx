import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchBar from './searchBar';
import { store } from '../../store/store';

describe('SearchBar', () => {
  test('renders without errors', () => {
    const wrapper = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });

  test('updates search input value on change', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = getByPlaceholderText('What movie are you looking for?') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test value' } });
    expect(searchInput.value).toBe('test value');
    fireEvent.submit(getByRole('search-submit'));
    expect(store.getState().search.searchValue).toEqual('test value');
  });
});
