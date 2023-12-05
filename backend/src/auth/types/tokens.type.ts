export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtBasePayload = {
  sub: string;
  iat: number;
  exp: number;
};

export type RtPayload = {
  refreshToken: string;
} & JwtBasePayload;

export type AtPayload = JwtBasePayload;
