import React from 'react';
import { CardData } from '../../types/types';

export default function PlantCard(props: CardData) {
  const { id, imgSrc, imgAlt, title, isSequel, genre, date } = props;

  return (
    <div className="card" data-id={id}>
      <img className="card__img" src={imgSrc} alt={imgAlt} />
      <h3 className="card__title">{title.toUpperCase()}</h3>
      <div className="card__desc">
        <p>genre: {genre}</p>
        <p>release: {date}</p>
        <p className="desc-sequel">
          {isSequel ? `❌it's another bad sequel❌` : `⭐️it's not another bad sequel!⭐️`}
        </p>
      </div>
    </div>
  );
}
