import { baseApi } from "../baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // api method here
    createProducts: builder.mutation({
      query: (products) => ({
        url: "/products",
        method: "POST",
        body: products,
      }),
      invalidatesTags: ['Products']
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ['Products']
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    updateProducts: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: formData,
        
      }),
      invalidatesTags: ['Products']
    }),
  }),
});

export const {
  useCreateProductsMutation,
  useGetProductsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productsApi;
