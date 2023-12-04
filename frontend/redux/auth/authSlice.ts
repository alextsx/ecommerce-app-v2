import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  email: string | null;
  access_token: string | null;
};

type SetCredentialPayload = {
  email: string;
  access_token: string;
};

const initialState: AuthState = {
  email: null,
  access_token: null
};

const reducers = {
  setCredentials(state: AuthState, action: PayloadAction<SetCredentialPayload>) {
    state.email = action.payload.email;
    state.access_token = action.payload.access_token;
  },
  deleteCredentials(state: AuthState) {
    state.email = null;
    state.access_token = null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers
});

//actions
export const { setCredentials, deleteCredentials } = authSlice.actions;

//reducer
export default authSlice.reducer;
