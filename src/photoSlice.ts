import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from './api/types';

interface PhotoSliceState {
  searchText: string;
  photos: Photo[];
}

const initialState: PhotoSliceState = {
  searchText: '',
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
