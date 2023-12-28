export enum ROLES {
  ADMIN,
  CUSTOMER
}

//API
export type WhoResponse = {
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

export type LoginResponse = {
  access_token: string;
};
export type RefreshResponse = {
  access_token: string;
};

//SLICE
export type AuthState = {
  email: string | null;
  access_token: string | null;
  role: string | null;
};

export type SetAuthDetailsPayload = {
  email: string;
  role: string;
};
