import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetUserDetailsPayload, UserDetailsState } from './types';

const initialState: UserDetailsState = {
  firstName: '',
  lastName: '',
  phone: ''
};

const reducers = {
  setUserDetails(state: UserDetailsState, action: PayloadAction<SetUserDetailsPayload>) {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.phone = action.payload.phone;
  }
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers
});

export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
