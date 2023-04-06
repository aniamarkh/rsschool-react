import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/moviesList/moviesList';
import { MovieData, TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';

export default function HomePage() {
  const [cards, setCards] = useState<MovieData[]>([]);
  const [search] = useState<string>(localStorage.getItem('search') || '');

  useEffect(() => {
    if (search !== '') {
      fetchSearchData(search).then((result: TmdbMovieResult[]) => getCards(result));
    } else {
      fetchPopular().then((result: TmdbMovieResult[]) => getCards(result));
    }
  }, [search]);

  const handleSearch = (value: string) => {
    fetchSearchData(value).then((result: TmdbMovieResult[]) => getCards(result));
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
