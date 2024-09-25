import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://online-nursery-website-server-psi.vercel.app",
        baseUrl: "http://localhost:5000",
    }),
    tagTypes: ["Category", "Products", "Cart"],
    endpoints: () => ({}),
})