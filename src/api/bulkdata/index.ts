import { scryfallApi } from '../index';

export const bulkData = scryfallApi.injectEndpoints({
  endpoints: builder => ({
    listBulkData: builder.query({
      query: () => ({
        url: '/bulk-data',
      }),
      providesTags: () => [{ type: 'BulkDataList' }],
    }),
  }),
});

export const { useListBulkDataQuery } = bulkData;
