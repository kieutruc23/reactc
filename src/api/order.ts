/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IOrder } from '../interfaces/order'

const orderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
    }),
    endpoints: (builder) => ({
        getOrders: builder.query<IOrder[], void>({
            query: () => 'orders',
            providesTags: ['Order']
        }),
        getOrderById: builder.query<IOrder, string | number>({
            query: (id) => `orders/${id}`,
            providesTags: ['Order']
        }),
        addOrder: builder.mutation({
            query: (value) => ({
                url: 'orders',
                method: 'POST',
                body: value
            }),
            invalidatesTags: ['Order']
        }),
        updateOrder: builder.mutation({
            query: (value) => ({
                url: `orders/${value.id}`,
                method: 'PATCH',
                body: value
            }),
            invalidatesTags: ['Order']
        })
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation
} = orderApi
export const orderReducer = orderApi.reducer
export default orderApi