import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SetUserDetailsPayload, UserDetailsState } from './user-details.types';

const initialState: UserDetailsState = {
  firstName: '',
  lastName: '',
  phone: '',
  shippingAddress: null,
  billingAddress: null,
  'billing-same-as-shipping': false
};

const reducers = {
  setUserDetails(state: UserDetailsState, action: PayloadAction<SetUserDetailsPayload>) {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.phone = action.payload.phone;
    state.shippingAddress = action.payload.shippingAddress;
    state.billingAddress = action.payload.billingAddress;
    state['billing-same-as-shipping'] = action.payload['billing-same-as-shipping'];
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

export const selectUserDetails = (state: RootState) => state.userDetails;

//actions
export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
