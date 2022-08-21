import axios from 'axios';
import Cookies from 'js.cookie';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/cookies';
import {
  deleteTokensFromCookies,
  setTokensInCookies
} from '../utils/tokenCookiesHelpers';

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

/**
 * axios interceptor를 통해 모든 axios 요청의 응답을 확인해, 로그인을 유지하거나 로그아웃을 수행
 * access token이 만료된 경우 access token을 재발급 받아, 로그인을 유지함
 */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status !== 401) return Promise.reject(error);

    const originalRequest = error.config;

    //  refresh token이 만료된 경우는 useLogOutIfRefreshTokenExpired에서 처리
    if (originalRequest.url === 'user/token/refresh') {
      return;
    }

    // access token이 만료된 경우 refresh 토큰 refresh 요청
    try {
      const res = await axios.post('api/user/token/refresh/', {
        refresh: Cookies.get(JWT_REFRESH_TOKEN)
      });
      const { access, refresh } = res.data;

      setTokensInCookies(access, refresh);

      axios.defaults.headers.Authorization = getBearerToken(access);
      originalRequest.headers.Authorization = getBearerToken(access);

      return axios(originalRequest);
    } catch (err) {
      deleteTokens();
      window.location.href = '/login';
    }
  }
);

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
