import fetch from 'cross-fetch';
import { MovieResponse, TmdbMovieResult } from '../types/types';

export const fetchSearchData = async (value: string): Promise<TmdbMovieResult[] | string> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6a130d2f0e9c0261931fa93ffcdac91a&query=${value}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    return results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return 'Error fetching movies data. Please try again later 😓';
  }
};

export const fetchPopular = (): Promise<TmdbMovieResult[] | string> => {
  return fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=6a130d2f0e9c0261931fa93ffcdac91a'
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.results;
      return results;
    })
    .catch((error) => {
      console.error('Error fetching movie data:', error);
      return 'Error fetching movies data. Please try again later 😓';
    });
};

export const fetchMovie = async (id: number): Promise<MovieResponse | string> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6a130d2f0e9c0261931fa93ffcdac91a`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data;

    return results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return 'Error fetching movie data. Please try again later 😓';
  }
};
