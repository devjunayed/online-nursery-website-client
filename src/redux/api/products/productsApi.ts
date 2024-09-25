import { ProductDataType } from "../../../types/dataType";
import { baseApi } from "../baseApi";


interface GetProductsResponse {
  data: ProductDataType[];
  length: number | null 
}


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
      query: (queryUrl) => ({
        url: `/products?${queryUrl}`,
        method: "GET",
      }),
      providesTags: ['Products'],
      transformResponse: (response: GetProductsResponse) => {
        return {
          data: response.data as ProductDataType[],
          length: response.length
        }
      },
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
