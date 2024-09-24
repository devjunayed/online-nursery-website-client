import { CategoryDataType } from "../../../components/Dashboard/Category/ManageCategory";
import { baseApi } from "../baseApi";

interface GetCategoryResponse {
  data: CategoryDataType[]; // This matches the `data` field in the response
}

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // api method here
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ['Category']
    }),
    getCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ['Category'],
      transformResponse: (response: GetCategoryResponse) => response.data,
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: categoryData,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
