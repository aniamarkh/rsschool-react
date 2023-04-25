import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../api/mock/server';
import MovieCard from './movieCard';
import { popularResult } from '../../api/mock/handlers';
import { TmdbMovieResult } from 'types/types';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

const movieData: TmdbMovieResult = popularResult.results[0];

const handleDate = (date: string): string => {
  if (date) {
    return new Date(date).getFullYear().toString();
  } else {
    return '';
  }
};

describe('Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <MovieCard {...movieData} />
      </Provider>
    );
  });

  test('renders without errors', () => {
    expect(wrapper).toBeTruthy();
  });

  test('displays correct title', () => {
    expect(wrapper.getByText(movieData.title.toUpperCase())).toBeDefined();
  });

  test('displays correct release date', async () => {
    expect(wrapper.getByText(handleDate(movieData.release_date))).toBeDefined();
  });

  test('render modal', async () => {
    await userEvent.click(wrapper.getByRole('movie-card'));
    expect(wrapper.container.getElementsByClassName('modal__window')).toBeDefined();
  });
});
