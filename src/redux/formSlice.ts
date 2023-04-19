import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializableCardData } from '../components/Form/types';

interface PetCardsState {
  cards: SerializableCardData[];
}

const initialState: PetCardsState = {
  cards: [],
};
export const formSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    addFormCard(state, action: PayloadAction<SerializableCardData>) {
      state.cards.push(action.payload);
    },
  },
});

export const { addFormCard } = formSlice.actions;
