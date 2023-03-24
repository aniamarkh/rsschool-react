import React from 'react';
import PlantCard from '../card/card';
import { PlantData } from '../../types/types';

export default class CardsList extends React.Component<{ data: PlantData[] }> {
  render() {
    const { data } = this.props;

    return (
      <ul className="card-list">
        {data.map((item: PlantData) => (
          <li key={item.id} className="card-list__item">
            <PlantCard {...item} />
          </li>
        ))}
      </ul>
    );
  }
}
