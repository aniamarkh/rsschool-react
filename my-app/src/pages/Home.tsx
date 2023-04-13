import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import MoviesList from '../components/moviesList/moviesList';
import { TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const searchState = useSelector((state: RootState) => state.searchValue);
  const [movies, setMovies] = useState<TmdbMovieResult[] | string>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchData = useCallback((value: string) => {
    setLoaded(false);
    const fetchFn = value.trim() === '' ? fetchPopular : () => fetchSearchData(value);
    fetchFn().then((result: TmdbMovieResult[] | string) => {
      setLoaded(true);
      setMovies(result);
    });
  }, []);

  useEffect(() => {
    fetchData(searchState.searchValue);
  }, [searchState.searchValue, fetchData]);

  const handleSearch = (searchValue: string) => {
    fetchData(searchValue);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {loaded && <MoviesList data={movies} />}
      {!loaded && <div className="loading"></div>}
    </div>
  );
}
