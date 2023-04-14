import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { flickrApi } from './api/flickrApi';
import { photoSlice } from './photoSlice';
import { CardData, formSlice } from './components/Form/formSlice';

export const store = configureStore({
  reducer: {
    [flickrApi.reducerPath]: flickrApi.reducer,
    photo: photoSlice.reducer,
    form: formSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flickrApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type SearchSelector = (state: RootState) => string;
type FormCardsSelector = (state: RootState) => CardData[];

setupListeners(store.dispatch);

export const selectSearchText: SearchSelector = (state) => state.photo.searchText;
export const selectFormCards: FormCardsSelector = (state) => state.form.cards;
