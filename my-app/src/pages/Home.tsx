import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/moviesList/moviesList';
import { MovieData, TmdbMovieResult } from '../types/types';

export default function HomePage() {
  const [cards, setCards] = useState<MovieData[]>(
    localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards') as string) : []
  );

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  async function fetchData(value: string) {
    console.log(value);
    // show loading in UI
    const url = 'https://api.themoviedb.org/3/search/movie?';
    const api_key = 'api_key=6a130d2f0e9c0261931fa93ffcdac91a';
    const query = '&query=';
    const lang = '&language=en-US';
    const adult = '&include_adult=false';

    try {
      const response = await fetch(url + api_key + query + value + lang + adult);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results;

      getCards(results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      // show error in UI
    }
  }

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

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
