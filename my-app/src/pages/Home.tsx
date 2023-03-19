import React from 'react';
import SearchBar from '../components/searchBar/searchBar';
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>This is home page</h1>
        <SearchBar />
      </div>
    )
  }
}