import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './searchBarSlice';
import { formReducer } from './formCardsSlice';
import { movieApi } from '../api/api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    formCards: formReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
