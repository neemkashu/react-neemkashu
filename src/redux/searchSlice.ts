import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchSliceState {
  searchText: string;
}

const initialState: SearchSliceState = {
  searchText: '',
};

export const searchSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updateSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { updateSearchText } = searchSlice.actions;
