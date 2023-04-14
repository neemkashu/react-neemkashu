import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { flickrApi } from './api/flickrApi';
import { photoSlice } from './photoSlice';
import { formSlice } from './components/Form/formSlice';

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

setupListeners(store.dispatch);

export const selectSearchText: SearchSelector = (state: RootState) => state.photo.searchText;
