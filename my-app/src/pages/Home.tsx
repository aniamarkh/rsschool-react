import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/moviesList/moviesList';
import { TmdbMovieResult } from '../types/types';
import { fetchSearchData, fetchPopular } from '../api/api';

export default function HomePage() {
  const [cards, setCards] = useState<TmdbMovieResult[]>([]);
  const [search] = useState<string>(localStorage.getItem('search') || '');

  const fetchData = useCallback((value: string) => {
    const fetchFn = value.trim() === '' ? fetchPopular : () => fetchSearchData(value);
    fetchFn().then((result: TmdbMovieResult[]) => setCards(result));
  }, []);

  useEffect(() => {
    fetchData(search);
  }, [search, fetchData]);

  const handleSearch = (value: string) => {
    fetchData(value);
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <CardsList data={cards} />
    </div>
  );
}
