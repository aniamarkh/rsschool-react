import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './searchBar';

const onSearch = () => {
  return '';
};

describe('SearchBar', () => {
  test('renders without errors', () => {
    const wrapper = render(<SearchBar onSearch={onSearch} />);
    expect(wrapper).toBeTruthy();
  });

  test('updates search input value on change', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearch} />);
    const searchInput = getByPlaceholderText('What movie are you looking for?') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test value' } });
    expect(searchInput.value).toBe('test value');
  });
});
