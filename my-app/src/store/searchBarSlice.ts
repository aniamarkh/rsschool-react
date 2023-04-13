import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchBarState } from '../types/types';

const initialState: SearchBarState = {
  searchValue: '',
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<SearchBarState>) {
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const searchBarAction = searchBarSlice.actions;
export const searchBarReducer = searchBarSlice.reducer;
