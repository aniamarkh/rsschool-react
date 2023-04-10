import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './Home';
import { server } from '../api/mock/server';

describe('HomePage tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => render(<HomePage />));

  test('renders homepage with popular movies', async () => {
    expect(await screen.findByText(/Popular Sample Movie/i)).toBeDefined();
    expect(await screen.findAllByRole('movie-card')).toHaveLength(1);
  });
});
