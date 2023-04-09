import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import MoviesList from '../components/moviesList/moviesList';
import { TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';

export default function HomePage() {
  const [movies, setMovies] = useState<TmdbMovieResult[] | null>([]);
  const [search] = useState<string>(localStorage.getItem('search') || '');
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
    fetchData(search);
  }, [search, fetchData]);

  const handleSearch = (value: string) => {
    fetchData(value);
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
