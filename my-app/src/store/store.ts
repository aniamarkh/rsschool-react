import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './searchBarSlice';
import { resultCardsReducer } from './apiCardsSlice';
import { formReducer } from './formCardsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    apiCards: resultCardsReducer,
    formCards: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
