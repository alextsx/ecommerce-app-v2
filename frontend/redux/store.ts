import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/api.slice';
import authReducer from './auth/auth.slice';
import cartReducer from './cart/cart.slice';
import userDetailsReducer from './user-details/user-details.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // only cart will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
