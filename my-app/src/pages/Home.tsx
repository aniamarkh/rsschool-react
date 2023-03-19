import React from 'react';
import SearchBar from '../components/searchBar/searchBar';
import CardsList from '../components/cardsList/cardsList';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="home">
        <SearchBar />
        <CardsList />
      </div>
    );
  }
}
