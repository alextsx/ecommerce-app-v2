export enum ROLES {
  ADMIN,
  CUSTOMER
}

export type WhoResponse = {
  email: string;
  role: ROLES;
};

export type LoginResponse = {
  access_token: string;
};
