import React from 'react';
import { PlantData } from '../../types/types';

export default class PlantCard extends React.Component<PlantData> {
  render() {
    const { id, imgSrc, imgAlt, title, petFriendly, inStock, price } = this.props;

    return (
      <div className="card" data-id={id}>
        <img className="card__img" src={imgSrc} alt={imgAlt} />
        <h3 className="card__title">{title}</h3>
        <div className="card__description">
          <p>Pet friendly?: {petFriendly ? '👍🐱🐶' : '❌❌❌'}</p>
          <p>In stock: {inStock}</p>
          <p>Price: ${price}</p>
        </div>
      </div>
    );
  }
}
