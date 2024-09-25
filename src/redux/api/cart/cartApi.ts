import { baseApi } from "../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // api method here
    createCart: builder.mutation({
      query: (product) => ({
        url: "/cart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useDeleteCartMutation
} = cartApi;
