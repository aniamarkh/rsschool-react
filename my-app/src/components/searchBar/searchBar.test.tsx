import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './searchBar';

describe('SearchBar', () => {
  test('renders without errors', () => {
    const wrapper = render(<SearchBar />);
    expect(wrapper).toBeTruthy();
  });

  test('updates search input value on change', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const searchInput = getByPlaceholderText('What are you looking for?') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test value' } });
    expect(searchInput.value).toBe('test value');
  });
});
