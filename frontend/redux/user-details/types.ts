//API
export type UserDetailsResponse = {
  firstName: string;
  lastName: string;
  phone: string;
  //todo will add addresses
};

//Slice
export type UserDetailsState = {
  firstName: string;
  lastName: string;
  phone: string;
  //todo will add addresses
};

export type SetUserDetailsPayload = {
  firstName: string;
  lastName: string;
  phone: string;
};
