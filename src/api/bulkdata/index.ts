import { scryfallApi } from '../index';

export const bulkData = scryfallApi.injectEndpoints({
  endpoints: (builder) => ({
    getBulkData: builder.query({
      query: (type) => ({
        url: `/bulk-data/${type}`,
      }),
      providesTags: ({ type }) => [{ type: 'BulkData', id: type }],
    }),
  }),
});

export const { useGetBulkDataQuery } = bulkData;
