import React from 'react';
import PlantCard from '../card/card';
import { CardData } from '../../types/types';

interface CardsListProps {
  data: CardData[];
}

export default function CardsList(props: CardsListProps) {
  const { data } = props;

  return (
    <ul className="card-list">
      {data.map((item: CardData) => (
        <li key={item.id} className="card-list__item">
          <PlantCard {...item} />
        </li>
      ))}
    </ul>
  );
}
