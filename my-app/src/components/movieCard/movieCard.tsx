import React from 'react';
import './movieCard.css';
import { MovieData } from '../../types/types';

export default function PlantCard(props: MovieData) {
  const { id, poster, date, title } = props;

  const handleDate = (date: string): string => {
    if (date) {
      return new Date(date).getFullYear().toString();
    } else {
      return '';
    }
  };

  const handleTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20).toUpperCase() + '...';
    } else {
      return title.toUpperCase();
    }
  };

  return (
    <div className="movie-card" data-id={id}>
      <img className="movie-card__img" src={poster} alt={title + ' poster'} />
      <h4 className="movie-card__title">{handleTitle(title)}</h4>
      <p>{handleDate(date)}</p>
    </div>
  );
}
