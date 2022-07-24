import Cookies from 'js.cookie';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/cookies';

export const deleteTokensFromCookies = () => {
  Cookies.remove(JWT_ACCESS_TOKEN);
  Cookies.remove(JWT_REFRESH_TOKEN);
};

export const setTokensInCookies = (access, refresh) => {
  if (access) {
    Cookies.set(JWT_ACCESS_TOKEN, access);
  }
  if (refresh) {
    Cookies.set(JWT_REFRESH_TOKEN, refresh);
  }
};
