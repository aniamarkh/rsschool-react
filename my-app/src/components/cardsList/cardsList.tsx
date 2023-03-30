import React from 'react';
import PlantCard from '../card/card';
import { PlantData } from '../../types/types';

interface CardsListProps {
  data: PlantData[];
}

export default function CardsList(props: CardsListProps) {
  const { data } = props;

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
