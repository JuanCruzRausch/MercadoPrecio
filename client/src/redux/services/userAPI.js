import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: () => {
    return {};
  },
});
