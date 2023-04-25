import { rest } from 'msw';
import { MovieResponse } from 'types/types';
import { fetch, Headers, Request, Response } from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const popularResult = {
  results: [
    {
      poster_path: '/path/to/poster3.jpg',
      adult: false,
      overview: 'This is an overview for Popular Movie.',
      release_date: '2022-01-01',
      genre_ids: [28, 12],
      id: 101,
      original_title: 'Popular Sample Movie',
      original_language: 'en',
      title: 'Popular Sample Movie',
      backdrop_path: '/path/to/backdrop3.jpg',
      popularity: 100.0,
      vote_count: 500,
      video: false,
      vote_average: 7.5,
    },
  ],
};

export const searchResult = {
  results: [
    {
      poster_path: '/path/to/poster1.jpg',
      adult: false,
      overview: 'This is a sample movie overview for Movie 1.',
      release_date: '2022-01-01',
      genre_ids: [28, 12],
      id: 1,
      original_title: 'Sample Movie 1',
      original_language: 'en',
      title: 'Sample Movie 1',
      backdrop_path: '/path/to/backdrop1.jpg',
      popularity: 100.0,
      vote_count: 500,
      video: false,
      vote_average: 7.5,
    },
    {
      poster_path: '/path/to/poster2.jpg',
      adult: false,
      overview: 'This is a sample movie overview for Movie 2.',
      release_date: '2022-02-01',
      genre_ids: [35, 18],
      id: 102,
      original_title: 'Sample Movie 2',
      original_language: 'en',
      title: 'Sample Movie 2',
      backdrop_path: '/path/to/backdrop2.jpg',
      popularity: 80.0,
      vote_count: 400,
      video: false,
      vote_average: 6.5,
    },
  ],
};

export const movieByIdResult: MovieResponse = {
  adult: false,
  backdrop_path: '/path/to/backdrop.jpg',
  belongs_to_collection: null,
  budget: 50000000,
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ],
  homepage: 'https://www.example.com',
  id: 101,
  imdb_id: 'tt1234567',
  original_language: 'en',
  original_title: 'Sample Movie 1',
  overview: 'This is a sample movie overview.',
  popularity: 100.0,
  poster_path: '/path/to/poster.jpg',
  production_companies: [
    {
      id: 1,
      logo_path: '/path/to/logo.jpg',
      name: 'Production Company 1',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2023-01-01',
  revenue: 200000000,
  runtime: 120,
  spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  status: 'Released',
  tagline: 'A sample movie tagline.',
  title: 'Sample Movie 1',
  video: false,
  vote_average: 7.5,
  vote_count: 500,
};

export const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularResult));
  }),

  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    if (query === 'movie') {
      return res(ctx.status(200), ctx.json(searchResult));
    }
  }),

  rest.get('https://api.themoviedb.org/3/movie/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === '101') {
      return res(ctx.status(200), ctx.json(movieByIdResult));
    }
  }),
];
