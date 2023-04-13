import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import MoviesList from '../components/moviesList/moviesList';
import { TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const searchState = useSelector((state: RootState) => state.searchValue);
  const [movies, setMovies] = useState<TmdbMovieResult[] | null>([]);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchData = useCallback(
    (value: string) => {
      setLoaded(false);
      const fetchFn = value.trim() === '' ? fetchPopular : () => fetchSearchData(value);
      fetchFn().then((result: TmdbMovieResult[] | string) => {
        setLoaded(true);
        if (typeof result === 'string') {
          setError(result);
          setMovies(null);
        } else {
          setMovies(result);
          setError('');
        }
      });
    },
    [setError]
  );

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
      {error && <h4 className="home__error">{error}</h4>}
      {movies?.length === 0 && loaded === true && <p>No movies found 🤔</p>}
    </div>
  );
}
