import { MovieResponse, TmdbMovieResult } from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    searchMovies: builder.query<TmdbMovieResult[], string>({
      query: (value) => `search/movie?api_key=6a130d2f0e9c0261931fa93ffcdac91a&query=${value}`,
      transformResponse: (response: { results: TmdbMovieResult[] }) => response.results,
    }),
    fetchPopular: builder.query<TmdbMovieResult[], void>({
      query: () => 'movie/popular?api_key=6a130d2f0e9c0261931fa93ffcdac91a',
      transformResponse: (response: { results: TmdbMovieResult[] }) => response.results,
    }),
    fetchMovie: builder.query<MovieResponse, number>({
      query: (id) => `movie/${id}?api_key=6a130d2f0e9c0261931fa93ffcdac91a`,
    }),
  }),
});

export const { useLazySearchMoviesQuery, useLazyFetchPopularQuery, useLazyFetchMovieQuery } =
  movieApi;
