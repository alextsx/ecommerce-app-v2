import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/api.slice';
import authReducer from './auth/auth.slice';
import cartReducer from './cart/cart.slice';
import userDetailsReducer from './user-details/user-details.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
