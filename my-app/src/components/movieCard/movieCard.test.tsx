import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../api/mock/server';
import MovieCard from './movieCard';
import { MovieData } from '../../types/types';
import { movieByIdResult } from '../../api/mock/handlers';

const movieData: MovieData = {
  id: 1,
  poster: 'assets/poster',
  date: '',
  title: 'Title Very Big Title Very Very Big Title',
};

describe('Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<MovieCard {...movieData} />);
  });

  test('renders without errors', () => {
    expect(wrapper).toBeTruthy();
  });

  test('displays correct title', () => {
    expect(wrapper.getByText(/Title Very Big Title.../i)).toBeDefined();
  });

  test('displays correct release date', () => {
    expect(wrapper.container.getElementsByClassName('movie-card').length).toBe(1);
    movieData.date = '2023-04-01';
    wrapper = render(<MovieCard {...movieData} />);
    expect(wrapper.getByText('2023')).toBeDefined();
  });

  test('render modal', async () => {
    await userEvent.click(wrapper.getByRole('movie-card'));
    expect(wrapper.container.getElementsByClassName('modal__window')).toBeDefined();
    expect(wrapper.getByText(movieByIdResult.title.toUpperCase() + ', 2023')).toBeDefined();
    expect(wrapper.getByText('Original title: ' + movieByIdResult.original_title)).toBeDefined();
    expect(wrapper.getByText(`${Math.round(movieByIdResult.vote_average)}/10`)).toBeDefined();
    movieByIdResult.genres.forEach((genre) => {
      expect(wrapper.getByText(genre.name)).toBeDefined();
    });
    expect(wrapper.getByText(movieByIdResult.overview)).toBeDefined();
    movieByIdResult.production_countries.forEach((country) => {
      expect(wrapper.getByText(country.name)).toBeDefined();
    });
    movieByIdResult.production_companies.forEach((company) => {
      expect(wrapper.getByText(company.name)).toBeDefined();
    });
  });
});
