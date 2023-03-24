import React from 'react';
import { PlantData } from '../../types/types';

export default class PlantCard extends React.Component<PlantData> {
  render() {
    const { id, imgSrc, imgAlt, title, petFriendly, price, date } = this.props;

    return (
      <div className="card" data-id={id}>
        <img className="card__img" src={`assets/img/${imgSrc}`} alt={imgAlt} />
        <h3 className="card__title">{title.toUpperCase()}</h3>
        <div className="card__desc">
          <p className="desc-price">Price: ${price}</p>
          <p>delivery: {date}</p>
          <p>🐱🐶: {petFriendly ? 'safe' : 'dangerous! ❌'}</p>
        </div>
      </div>
    );
  }
}
