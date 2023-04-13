import { configureStore } from '@reduxjs/toolkit';
import { searchBarReducer } from './searchBarSlice';
import { formReducer } from './formCardsSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchBarReducer,
    formCards: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
