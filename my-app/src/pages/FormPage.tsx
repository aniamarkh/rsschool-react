import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/forms/form';
import CardsList from '../components/cardsList/cardsList';
import { CardData } from '../types/types';
import { RootState } from '../store/store';
import { formAction } from '../store/formCardsSlice';

export default function FormPage() {
  const formCardsState = useSelector((state: RootState) => state.formCards);
  const dispatch = useDispatch();

  const updateCards = (card: CardData) => {
    dispatch(formAction.setValue(card));
  };

  return (
    <div className="form-page">
      <Form updateCards={updateCards} cards={formCardsState.formCards} />
      <CardsList data={formCardsState.formCards} />
    </div>
  );
}
