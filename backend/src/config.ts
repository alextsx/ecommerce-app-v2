export interface Config {
  port: number;
  atSecret: string;
  rtSecret: string;
  atExpiresIn: number;
  rtExpiresIn: number;
  rtCookieName: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  atSecret: process.env.AT_SECRET || 'default_secret',
  rtSecret: process.env.RT_SECRET || 'default_secret',
  rtExpiresIn: 60 * 60 * 24 * 7, // 7 days
  atExpiresIn: 40, // 40 seconds
  rtCookieName: 'rt'
};
