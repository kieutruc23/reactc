/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISize } from '../interfaces/size'

const sizeApi = createApi({
    reducerPath: 'sizes',
    tagTypes: ['Size'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getSizes: builder.query<ISize[], void>({
            query: () => 'sizes',
            providesTags: ['Size']
        }),
        getSizeById: builder.query<ISize, string | number>({
            query: (id) => `sizes/${id}`,
            providesTags: ['Size']
        }),
        addSize: builder.mutation({
            query: (value) => ({
                url: 'sizes',
                method: 'POST',
                body: value
            }),
            invalidatesTags: ['Size']
        }),
        removeSize: builder.mutation<ISize, string | number>({
            query: (id) => ({
                url: `sizes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Size']
        }),
        updateSize: builder.mutation({
            query: (value) => ({
                url: `sizes/${value.id}`,
                method: 'PATCH',
                body: value
            }),
            invalidatesTags: ['Size']
        })
    })
})

export const {
    useGetSizesQuery,
    useGetSizeByIdQuery,
    useAddSizeMutation,
    useRemoveSizeMutation,
    useUpdateSizeMutation
} = sizeApi
export const sizeReducer = sizeApi.reducer
export default sizeApi