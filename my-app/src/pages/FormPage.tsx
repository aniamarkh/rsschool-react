import React, { useState } from 'react';
import Form from '../components/forms/form';
import CardsList from '../components/cardsList/cardsList';
import { CardData } from '../types/types';

export default function FormPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  const updateCards = (card: CardData) => {
    setCards([...cards, card]);
  };

  return (
    <div className="form-page">
      <Form updateCards={updateCards} cards={cards} />
      <CardsList data={cards} />
    </div>
  );
}
