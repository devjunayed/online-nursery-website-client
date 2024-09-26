import { ProductDataType } from "../../../types/dataType";
import { baseApi } from "../baseApi";

interface OrderDataType {
  name: string;
  phone: string;
  address: string;
  grandTotal: number;
  data: ProductDataType[];
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData: OrderDataType) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ['Orders', 'Cart'], 
    }),

    getOrders: builder.query({
      query: () => ({
        url: "/order", 
        method: "GET",
      }),
      providesTags: ['Orders'], 
    }),

    
  }),
});


export const {
  useCreateOrderMutation,
  useGetOrdersQuery, 
} = orderApi;
