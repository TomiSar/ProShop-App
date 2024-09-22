import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';
import { Product } from '../models/product';
import { OrderItems, ShippingAddress } from '../models/order';

// Export CartState so it can be used in other parts of your app
export interface CartState {
  cartItems: OrderItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice?: string; // These fields are optional since updateCart will calculate them
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
}

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderItems>) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (orderItem) => orderItem.product === item.product
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((orderItem) =>
          orderItem.product === existingItem.product ? item : orderItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action: PayloadAction<Product['_id']>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.product !== action.payload
      );

      return updateCart(state);
    },

    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
