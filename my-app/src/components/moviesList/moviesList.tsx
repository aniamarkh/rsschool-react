import React from 'react';
import MovieCard from '../movieCard/movieCard';
import { TmdbMovieResult, MovieData } from '../../types/types';

interface MoviesListProps {
  data: TmdbMovieResult[] | null;
}

export default function MoviesList(props: MoviesListProps) {
  const { data } = props;

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
      return cards;
    } else {
      return [];
    }
  };

  return (
    <ul className="card-list">
      {data &&
        getCards(data).map((item: MovieData) => (
          <li key={item.id} className="card-list__item">
            <MovieCard {...item} />
          </li>
        ))}
    </ul>
  );
}
