export interface Config {
  port: number;
  atSecret: string;
  rtSecret: string;
  atExpiresIn: number;
  rtExpiresIn: number;
  rtMaxAge: number;
  rtCookieName: string;
  corsOrigin?: string;
  STRIPE_SECRET_KEY: string;
}

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
const FORTY_SECONDS_IN_SECONDS = 40;
const SEVEN_DAYS_IN_MILISECONDS = SEVEN_DAYS_IN_SECONDS * 1000;

export const config: () => Config = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  atSecret: process.env.AT_SECRET || 'default_secret',
  rtSecret: process.env.RT_SECRET || 'default_secret',
  rtExpiresIn: SEVEN_DAYS_IN_SECONDS,
  atExpiresIn: FORTY_SECONDS_IN_SECONDS,
  rtMaxAge: SEVEN_DAYS_IN_MILISECONDS,
  rtCookieName: process.env.RT_COOKIE_NAME || 'refresh_token',
  corsOrigin: process.env.FRONTEND_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
});
