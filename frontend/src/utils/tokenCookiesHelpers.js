import { deleteCookie, setCookie } from '@utils/cookies';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/cookies';

export const deleteTokensFromCookies = () => {
  deleteCookie(JWT_ACCESS_TOKEN);
  deleteCookie(JWT_REFRESH_TOKEN);
};

export const setTokensInCookies = (access, refresh) => {
  if (access) {
    setCookie(JWT_ACCESS_TOKEN, access, JWT_ACCESS_TOKEN_LIFE_DAYS);
  }
  if (refresh) {
    setCookie(JWT_REFRESH_TOKEN, refresh, JWT_REFRESH_TOKEN_LIFE_DAYS);
  }
};

const JWT_ACCESS_TOKEN_LIFE_DAYS = 7;
const JWT_REFRESH_TOKEN_LIFE_DAYS = 30;
