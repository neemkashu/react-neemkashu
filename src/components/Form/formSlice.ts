import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetFormData } from './formChecker';

interface PetCardsState {
  cards: PetFormData[];
}

const initialState: PetCardsState = {
  cards: [],
};
export const formSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    addFormCard(state, action: PayloadAction<PetFormData>) {
      state.cards.push(action.payload);
    },
  },
});

export const { addFormCard } = formSlice.actions;
