import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  email: string | null;
  accessToken: string | null;
};

type SetCredentialPayload = {
  email: string;
  accessToken: string;
};

const initialState: AuthState = {
  email: null,
  accessToken: null
};

const reducers = {
  setCredentials(state: AuthState, action: PayloadAction<SetCredentialPayload>) {
    state.email = action.payload.email;
    state.accessToken = action.payload.accessToken;
  },
  deleteCredentials(state: AuthState) {
    state.email = null;
    state.accessToken = null;
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
