import React from 'react';
import { Provider } from 'react-redux';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { server } from '../api/mock/server';
import { store } from '../store/store';
import HomePage from './Home';

describe('HomePage tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders homepage with popular movies', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(await screen.findByPlaceholderText('What movie are you looking for?')).toBeDefined();
    expect(await screen.findByText(/Popular Sample Movie/i)).toBeDefined();
    expect(await screen.findAllByRole('movie-card')).toHaveLength(1);
  });
});
