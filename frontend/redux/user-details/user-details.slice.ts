import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
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

//selectors
export const selectFullName = (state: RootState) => {
  const { firstName, lastName } = state.userDetails;
  return `${firstName} ${lastName}`;
};
export const selectNameInitials = (state: RootState) => {
  const { firstName, lastName } = state.userDetails;
  return `${firstName?.[0]}${lastName?.[0]}`;
};

//actions
export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
