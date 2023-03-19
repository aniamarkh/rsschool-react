import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import SearchBar from './searchBar';

describe('SearchBar', () => {
  test('renders without errors', () => {
    const wrapper = render(<SearchBar />);
    expect(wrapper).toBeTruthy();
  });
});
