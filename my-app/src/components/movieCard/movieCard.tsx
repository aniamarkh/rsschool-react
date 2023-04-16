import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './movieCard.css';
import { TmdbMovieResult } from '../../types/types';
import ModalContent from '../modal/modal';

export default function MovieCard(props: TmdbMovieResult) {
  const movie = props;
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const showModalWindow = async () => {
    setShowModal(true);
  };

  return (
    <div className="movie-card__wrapper">
      {showModal &&
        createPortal(
          <ModalContent data={movie.id} onClose={() => setShowModal(false)} />,
          document.body
        )}
      <div className="movie-card" role="movie-card" onClick={showModalWindow}>
        <img
          className="movie-card__img"
          src={
            movie.poster_path === null
              ? 'assets/img/noposter.jpeg'
              : 'https://image.tmdb.org/t/p/w500' + movie.poster_path
          }
          alt={movie.title + ' poster'}
        />
        <h4 className="movie-card__title">{handleTitle(movie.title)}</h4>
        <p>{handleDate(movie.release_date)}</p>
      </div>
    </div>
  );
}
