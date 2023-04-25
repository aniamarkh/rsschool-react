import React from 'react';
import { Provider } from 'react-redux';
import { describe, test, expect } from 'vitest';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '../../api/mock/server';
import { store } from '../../store/store';
import MoviesList from './moviesList';

describe('Movies List', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders without errors', async () => {
    const wrapper = render(
      <Provider store={store}>
        <MoviesList />
      </Provider>
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.container.getElementsByClassName('loading')).toBeDefined();
    await waitForElementToBeRemoved(() => wrapper.container.getElementsByClassName('loading'));
    expect(await wrapper.findByText(/Popular Sample Movie/i)).toBeDefined();
    expect(await wrapper.findAllByRole('movie-card')).toHaveLength(1);
    const cardsNumber = wrapper.container.getElementsByClassName('card-list__item');
    expect(cardsNumber.length).toBe(1);
  });
});
