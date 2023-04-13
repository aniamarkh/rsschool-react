import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormCardsState, CardData } from '../types/types';

const initialState: FormCardsState = {
  formCards: [],
};

const searchBarSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<CardData>) {
      state.formCards.push(action.payload);
    },
  },
});

export const formAction = searchBarSlice.actions;
export const formReducer = searchBarSlice.reducer;
