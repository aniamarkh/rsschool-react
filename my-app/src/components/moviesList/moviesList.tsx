import React, { useEffect } from 'react';
import MovieCard from '../movieCard/movieCard';
import { TmdbMovieResult } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLazyFetchPopularQuery, useLazySearchMoviesQuery } from '../../api/api';

export default function MoviesList() {
  const searchState = useSelector((state: RootState) => state.search.searchValue);
  const [
    triggerSearchMovies,
    { data: searchData, error: searchError, isFetching: searchFetching },
  ] = useLazySearchMoviesQuery();
  const [
    triggerFetchPopular,
    { data: popularData, error: popularError, isFetching: popularFetching },
  ] = useLazyFetchPopularQuery();

  useEffect(() => {
    if (searchState) {
      triggerSearchMovies(searchState);
    } else {
      triggerFetchPopular();
    }
  }, [searchState, triggerSearchMovies, triggerFetchPopular]);

  const cards = searchState ? searchData : popularData;
  const error = searchState ? searchError : popularError;
  const isFetching = searchState ? searchFetching : popularFetching;
  return (
    <div className="card-list__wrapper">
      {isFetching && <div className="loading"></div>}
      {!isFetching && error && (
        <h4 className="home__error">Error fetching movies data. Please try again later 😓</h4>
      )}
      {!isFetching && cards && cards.length === 0 && !error && (
        <h4 className="home__error">No movies found 😓</h4>
      )}
      {!isFetching && cards && cards.length > 0 && !error && (
        <ul className="card-list">
          {cards.map((item: TmdbMovieResult) => (
            <li key={item.id} className="card-list__item">
              <MovieCard {...item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
