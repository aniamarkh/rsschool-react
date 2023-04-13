import { configureStore } from '@reduxjs/toolkit';
import { searchBarReducer } from './searchBarSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
