import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiCardsState } from '../types/types';

const initialState: ApiCardsState = {
  apiCards: [],
};

const resultCardsSlice = createSlice({
  name: 'resultCards',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<ApiCardsState>) {
      state.apiCards = action.payload.apiCards;
    },
  },
});

export const resultCardsAction = resultCardsSlice.actions;
export const resultCardsReducer = resultCardsSlice.reducer;
