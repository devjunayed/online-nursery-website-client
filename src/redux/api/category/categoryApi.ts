import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // api method here
        createCategory: builder.mutation({
            query: (category) => ({
                url: "/category",
                method: "POST",
                body: category
            })
        }),
        getCategory: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
            })
        }),
    })
})

export const {useCreateCategoryMutation, useGetCategoryQuery } = categoryApi;