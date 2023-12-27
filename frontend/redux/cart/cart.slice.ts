import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../product/product.types';
import { RootState } from '../store';
import { CartItem, CartState } from './cart.types';

const initialState: CartState = [];

const reducers = {
  emptyCart: (state: CartState) => {
    state.splice(0);
  },
  addToCart: (state: CartState, action: PayloadAction<Product>) => {
    const item = action.payload;
    const newCartItem: CartItem = {
      ...item,
      imageUrl: item.productImages?.[0],
      quantity: 1
    };
    const existingItem = state.find((i) => i.slug === item.slug);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.push(newCartItem);
    }
  },
  decreaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    const slug = action.payload;
    const index = state.findIndex((i) => i.slug === slug);
    if (index === -1) return;

    const existingItem = state[index];
    if (existingItem) {
      if (existingItem.quantity === 1) {
        state.splice(index, 1);
      } else {
        existingItem.quantity -= 1;
      }
    }
  },
  increaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    const slug = action.payload;
    const existingItem = state.find((i) => i.slug === slug);
    if (existingItem) {
      existingItem.quantity += 1;
    }
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers
});

//selectors
export const selectCart = (state: RootState) => state.cart;
export const selectCartTotal = (state: RootState) => {
  return state.cart.reduce(
    (acc, item) => acc + (item.discountedPrice ?? item.price) * item.quantity,
    0
  );
};

//actions
export const { emptyCart, addToCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;

//reducer
export default cartSlice.reducer;
