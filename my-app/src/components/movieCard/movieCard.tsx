import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './movieCard.css';
import { MovieData, MovieResponse, ModalData } from '../../types/types';
import { fetchMovie } from '../../api/api';
import ModalContent from '../modal/modal';

export default function MovieCard(props: MovieData) {
  const { id, poster, date, title } = props;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

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

  const getModalData = async () => {
    setShowModal(true);
    fetchMovie(id).then((result: MovieResponse) => {
      const modalData: ModalData = {
        title: result.title,
        original_title: result.original_title,
        poster:
          result.poster_path === null
            ? 'assets/img/noposter.jpeg'
            : 'https://image.tmdb.org/t/p/w500' + result.poster_path,
        genres: result.genres.map((item) => item.name),
        release: handleDate(result.release_date),
        rate: Math.round(result.vote_average),
        overview: result.overview,
        homepage: result.homepage,
        country: result.production_countries.map((item) => item.name),
        prod: result.production_companies.map((item) => item.name),
      };
      setModalData(modalData);
    });
  };

  return (
    <div className="movie-card__wrapper">
      {showModal &&
        createPortal(
          <ModalContent data={modalData} onClose={() => setShowModal(false)} />,
          document.body
        )}

      <div className="movie-card" data-id={id} onClick={getModalData}>
        <img className="movie-card__img" src={poster} alt={title + ' poster'} />
        <h4 className="movie-card__title">{handleTitle(title)}</h4>
        <p>{handleDate(date)}</p>
      </div>
    </div>
  );
}
