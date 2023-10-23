import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../interfaces/product'
// import { pause } from '../utils/pause'

const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
        // fetchFn: async(...args) => {
        //     await pause(1000)
        //     return fetch(...args)
        // }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => 'products',
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, string | number>({
            query: (id) => `products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, string | number>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useUpdateProductMutation
} = productApi
export const productReducer = productApi.reducer
export default productApi