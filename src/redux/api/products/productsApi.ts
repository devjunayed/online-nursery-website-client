import { baseApi } from "../baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // api method here
    createProducts: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
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
      query: ({ id, productData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: productData,
        
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
