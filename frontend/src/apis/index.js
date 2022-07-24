import axios from 'axios';
import Cookies from 'js.cookie';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/cookies';

const csrf_token = Cookies.get('csrftoken');
const access_token = Cookies.get(JWT_ACCESS_TOKEN);
const getBearerToken = (token) => `Bearer ${token}`;

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

export const deleteAxiosToken = () => {
  delete instance.defaults.headers.Authorization;
};

// access token이 만료된 경우 refresh token이 있다면 토큰 refresh 요청
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refresh_token = Cookies.get(JWT_REFRESH_TOKEN);

    // FIXME: Unauthorized 401 로 수정되면 수정 필요!
    if (error.response.status === 403 && refresh_token) {
      return instance
        .post('user/token/refresh/', { refresh: refresh_token })
        .then((response) => {
          Cookies.set(JWT_REFRESH_TOKEN, response.data.refresh);
          Cookies.set(JWT_ACCESS_TOKEN, response.data.access);

          instance.defaults.headers.Authorization = getBearerToken(
            response.data.access
          );
          originalRequest.headers.Authorization = getBearerToken(
            response.data.access
          );

          instance.get('user/me/');

          return instance(originalRequest);
        })
        .catch((err, dispatch) => {
          dispatch({ type: 'user/LOGIN_FAILURE', error: err });
        });
    }
    return Promise.reject(error);
  }
);
export default instance;
