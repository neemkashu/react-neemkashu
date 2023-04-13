import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FlickrData, getRequestParams, PROXY_URL } from './getCards';

export const flickrApi = createApi({
  reducerPath: 'flickrApi',
  baseQuery: fetchBaseQuery({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    getPhotosByQuery: builder.query<FlickrData, string>({
      query: (searchQuery: string) => `?${getRequestParams(searchQuery)}`,
    }),
  }),
});

export const useGetPhotosByQuery = flickrApi.endpoints.getPhotosByQuery.useQuery;
