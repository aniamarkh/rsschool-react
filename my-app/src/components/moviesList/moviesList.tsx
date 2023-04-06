import React from 'react';
import MovieCard from '../movieCard/movieCard';
import { MovieData } from '../../types/types';

interface MoviesListProps {
  data: MovieData[] | null;
}

export default function MoviesList(props: MoviesListProps) {
  const { data } = props;

  return (
    <ul className="card-list">
      {data &&
        data.map((item: MovieData) => (
          <li key={item.id} className="card-list__item">
            <MovieCard {...item} />
          </li>
        ))}
    </ul>
  );
}
