import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthState, SetAuthDetailsPayload } from './types';

const initialState: AuthState = {
  email: null,
  access_token: null,
  role: null
};

const reducers = {
  setAuthDetails(state: AuthState, action: PayloadAction<SetAuthDetailsPayload>) {
    state.email = action.payload.email;
    state.role = action.payload.role;
  },
  setAccessToken(state: AuthState, action: PayloadAction<string>) {
    state.access_token = action.payload;
  },
  deleteCredentials(state: AuthState) {
    state.email = null;
    state.access_token = null;
    state.role = null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers
});

//selectors
export const selectEmail = (state: RootState): string | null => state.auth.email;
export const selectAccessToken = (state: RootState): string | null => state.auth.access_token;

//actions
export const { setAuthDetails, deleteCredentials, setAccessToken } = authSlice.actions;

//reducer
export default authSlice.reducer;
