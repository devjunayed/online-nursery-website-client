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
        })
    })
})

export const {useCreateCategoryMutation} = categoryApi;