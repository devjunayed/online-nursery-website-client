import { baseApi } from "../baseApi";

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
      providesTags: ['Category']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
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
