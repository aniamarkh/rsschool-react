import React from 'react';
import SearchBar from '../components/searchBar/searchBar';
import MoviesList from '../components/moviesList/moviesList';

export default function HomePage() {
  return (
    <div className="home">
      <SearchBar />
      <MoviesList />
    </div>
  );
}
