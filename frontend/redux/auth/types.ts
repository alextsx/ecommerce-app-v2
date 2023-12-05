export enum ROLES {
  ADMIN,
  CUSTOMER
}

export type WhoResponse = {
  email: string;
  role: ROLES;
};
