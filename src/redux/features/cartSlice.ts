import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDataType } from '../../types/dataType';

interface CartState {
  cartData: ProductDataType[];
  grandTotal: number;
}

const initialState: CartState = {
  cartData: [],
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartSummary: (
      state,
      action: PayloadAction<{ cartData: ProductDataType[]; grandTotal: number }>
    ) => {
      state.cartData = action.payload.cartData;
      state.grandTotal = action.payload.grandTotal;
    },
  },
});

export const { setCartSummary } = cartSlice.actions;

export default cartSlice.reducer;
