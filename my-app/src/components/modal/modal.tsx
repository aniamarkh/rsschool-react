import React, { useEffect, useRef } from 'react';
import './modal.css';
import { useLazyFetchMovieQuery } from '../../api/api';

interface ModalProps {
  data: number;
  onClose: () => void;
}

export default function ModalContent({ data, onClose }: ModalProps) {
  const id = data;
  const modalRef = useRef<HTMLDivElement>(null);
  const [triggerFetchMovie, { data: movieData, error: movieError, isFetching: movieFetching }] =
    useLazyFetchMovieQuery();

  useEffect(() => {
    triggerFetchMovie(id);
  }, [triggerFetchMovie, id]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleDate = (date: string): string => {
    if (date) {
      return new Date(date).getFullYear().toString();
    } else {
      return '';
    }
  };

  return (
    <div className="modal__window" onClick={handleBackdropClick}>
      <div className="modal" ref={modalRef}>
        {movieFetching && <div className="loading"></div>}
        {!movieFetching && movieError && (
          <h4>Error fetching movie data. Please try again later 😓</h4>
        )}
        {movieData && !movieFetching && !movieError && (
          <div className="modal__movie">
            <img
              className="modal_img"
              src={
                movieData.poster_path === null
                  ? 'assets/img/noposter.jpeg'
                  : 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
              }
              alt={movieData.title + 'poster'}
            />
            <div className="modal_overview">
              <div className="modal__top">
                <h2 className="overview__title">
                  {movieData.title.toUpperCase()}, {handleDate(movieData.release_date)}
                </h2>
                <p className="overview__or-title pale">
                  Original title: {movieData.original_title}
                </p>
                <div className="overview__rating">
                  <img src="assets/img/star.png" alt="rating" />
                  <p>{Math.round(movieData.vote_average)}/10</p>
                </div>
                <div className="genres__wrapper">
                  {movieData.genres.map((item, index) => (
                    <p className="overview__genre" key={index}>
                      {item.name}
                    </p>
                  ))}
                </div>
                <p className="overview__desc">{movieData.overview}</p>
                <p className="pale">
                  <b>Production countries: </b>
                  {movieData.production_countries.map((item) => item.name).join(', ')}
                </p>
                <p className="pale">
                  <b>Production companies: </b>
                  {movieData.production_companies.map((item) => item.name).join(', ')}
                </p>
              </div>
              <div className="modal__bottom">
                {movieData.homepage && (
                  <button
                    onClick={() => window.open(movieData.homepage?.toString(), '_blank')}
                    className="overview__link"
                  >
                    WATCH ONLINE
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {!movieFetching && (
          <button className="close__btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
    </div>
  );
}
