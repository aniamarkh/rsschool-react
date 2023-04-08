import React, { useRef } from 'react';
import './modal.css';
import { ModalData } from 'types/types';

interface ModalProps {
  data: ModalData | null;
  onClose: () => void;
}

export default function ModalContent({ data, onClose }: ModalProps) {
  const movie = data;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal__window" onClick={handleBackdropClick}>
      {movie === null && <div className="loading"></div>}
      {movie !== null && (
        <div className="modal" ref={modalRef}>
          <img className="modal_img" src={movie?.poster} alt={movie?.title + 'poster'} />
          <div className="modal_overview">
            <div className="modal__top">
              <h2 className="overview__title">
                {movie?.title.toUpperCase()}, {movie?.release}
              </h2>
              <p className="overview__or-title pale">Original title: {movie?.original_title}</p>
              <div className="overview__rating">
                <img src="assets/img/star.png" alt="rating" />
                <p>{movie?.rate}/10</p>
              </div>
              <div className="genres__wrapper">
                {movie?.genres.map((item, index) => (
                  <p className="overview__genre" key={index}>
                    {item}
                  </p>
                ))}
              </div>
              <p className="overview__desc">{movie?.overview}</p>
              <p className="pale">
                <b>Production countries: </b>
                {movie?.country.join(', ')}
              </p>
              <p className="pale">
                <b>Production companies: </b>
                {movie?.prod.join(', ')}
              </p>
            </div>
            <div className="modal__bottom">
              {movie && movie.homepage && (
                <button
                  onClick={() => window.open(movie?.homepage?.toString(), '_blank')}
                  className="overview__link"
                >
                  WATCH ONLINE
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
