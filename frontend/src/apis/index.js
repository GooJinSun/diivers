import axios from 'axios';
import Cookies from 'js.cookie';
import { JWT_ACCESS_TOKEN } from '../constants/cookies';
import { deleteTokensFromCookies } from '../utils/tokenCookiesHelpers';

const csrf_token = Cookies.get('csrftoken');
const access_token = Cookies.get(JWT_ACCESS_TOKEN);
export const getBearerToken = (token) => `Bearer ${token}`;

const instance = axios.create({
  baseURL: '/api/',
  withCredentials: true,
  headers: {
    ...(csrf_token ? { 'X-CSRFToken': csrf_token } : {}),
    'Content-Type': 'application/json',
    ...(access_token
      ? { Authorization: `${getBearerToken(access_token)}` }
      : {})
  }
});

export const deleteAxiosHeaderToken = () => {
  delete instance.defaults.headers.Authorization;
};

export const deleteTokens = () => {
  deleteAxiosHeaderToken();
  deleteTokensFromCookies();
};

instance.interceptors.request.use((config) => {
  if (config.url === 'user/signup/')
    return {
      ...config,
      headers: {
        Authorization: '' // 회원가입 시, 이전 사용자의 토큰을 기본으로 세팅하는 걸 방지하기 위해 명시적으로 Authorization 헤더를 제거해서 요청
      }
    };

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = getBearerToken(Cookies.get(JWT_ACCESS_TOKEN));
  return config;
});

export default instance;
