import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

//actions
export const { setAuthDetails, deleteCredentials, setAccessToken } = authSlice.actions;

//reducer
export default authSlice.reducer;
