import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH_KEY } from './utils/constants';
import { Photo } from './api/getCards';

interface PhotoSliceState {
  searchText: string;
  photos: Photo[];
}

const initialState: PhotoSliceState = {
  searchText: localStorage.getItem(SEARCH_KEY) ?? '',
  photos: [],
};
export const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updateSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { updateSearchText } = photoSlice.actions;
