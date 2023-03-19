import React from 'react';
import PlantCard from '../card/card';
import { PlantData } from '../../types/types';
import { plantsData } from '../../data/plants';

export default class CardsList extends React.Component {
  render() {
    return (
      <ul className="card-list">
        {plantsData.map((item: PlantData) => (
          <li key={item.id} className="card-list__item">
            <PlantCard {...item} />
          </li>
        ))}
      </ul>
    );
  }
}
