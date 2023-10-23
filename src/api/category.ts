import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../interfaces/category'

const categoryApi = createApi({
    reducerPath: 'categories',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => 'categories',
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, string | number>({
            query: (id) => `categories/${id}`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: 'categories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<ICategory, string | number>({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `categories/${category.id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi
export const categoryReducer = categoryApi.reducer
export default categoryApi