import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/moviesList/moviesList';
import { MovieData, TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';

export default function HomePage() {
  const [cards, setCards] = useState<MovieData[]>([]);
  const [search] = useState<string>(localStorage.getItem('search') || '');

  const fetchData = useCallback((value: string) => {
    const fetchFn = value.trim() === '' ? fetchPopular : () => fetchSearchData(value);
    fetchFn().then((result: TmdbMovieResult[]) => getCards(result));
  }, []);

  useEffect(() => {
    fetchData(search);
  }, [search, fetchData]);

  const handleSearch = (value: string) => {
    fetchData(value);
  };

  const getCards = (result: TmdbMovieResult[]) => {
    if (result.length > 0) {
      const cards: MovieData[] = [];
      result.forEach((movie: TmdbMovieResult) => {
        const movieCard: MovieData = {
          id: movie.id,
          poster:
            movie.poster_path === null
              ? 'assets/img/noposter.jpeg'
              : 'https://image.tmdb.org/t/p/w342' + movie.poster_path,
          date: movie.release_date,
          title: movie.title,
        };
        cards.push(movieCard);
      });
      setCards(cards);
    } else {
      setCards([]);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <CardsList data={cards} />
    </div>
  );
}
