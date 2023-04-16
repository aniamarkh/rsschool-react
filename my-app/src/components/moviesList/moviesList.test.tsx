import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import MoviesList from './moviesList';
import { store } from '../../store/store';
import { server } from '../../api/mock/server';

describe('Movies List', () => {
  let wrapper: RenderResult;
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <MoviesList />
      </Provider>
    );
  });

  test('renders without errors', () => {
    expect(wrapper).toBeTruthy();
  });

  test('display loading spinner', () => {
    expect(wrapper.container.getElementsByClassName('loading')).toBeDefined();
  });

  test('renders correct number of Card components', async () => {
    expect(await wrapper.findByText(/Popular Sample Movie/i)).toBeDefined();
    expect(await wrapper.findAllByRole('movie-card')).toHaveLength(1);
    const cardsNumber = wrapper.container.getElementsByClassName('card-list__item');
    expect(cardsNumber.length).toBe(1);
  });
});
