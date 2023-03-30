import React from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/cardsList/cardsList';
import { plantsData } from '../data/plants';

export default function HomePage() {
  return (
    <div className="home">
      <SearchBar />
      <CardsList data={plantsData} />
    </div>
  );
}
