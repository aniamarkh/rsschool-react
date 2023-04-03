import React, { useState } from 'react';
import Form from '../components/forms/form';
import CardsList from '../components/cardsList/cardsList';
import { PlantData } from '../types/types';

export default function FormPage() {
  const [cards, setCards] = useState<PlantData[]>([]);

  const updateCards = (card: PlantData) => {
    setCards([...cards, card]);
  };

  return (
    <div className="form-page">
      <Form updateCards={updateCards} cards={cards} />
      <CardsList data={cards} />
    </div>
  );
}
