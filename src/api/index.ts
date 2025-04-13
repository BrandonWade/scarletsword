import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.scryfall.com'; // TODO: Move to environment variable
const userAgent = 'scarletsword:1.0.0'; // TODO: Move to environment variable

export const scryfallApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('User-Agent', userAgent);
      headers.set('Accept', '*/*');
      return headers;
    },
  }),
  tagTypes: ['BulkData'],
  endpoints: () => ({}),
});
