/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import Cookies from 'js.cookie';
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../constants/cookies';
// eslint-disable-next-line import/no-cycle

const developBaseUrl = 'http://localhost:3000/api/';
const prodBaseUrl = 'https://adoor.world/api/';

const instance = axios.create({
  baseURL: '/api/',
  // baseURL: developBaseUrl,
  withCredentials: true
});

const getBearerToken = (token) => `Bearer ${token}`;

instance.defaults.headers.common['Content-Type'] = 'application/json';

instance.interceptors.request.use((config) => {
  const csrf_token = Cookies.get('csrftoken');
  const jwt_token = Cookies.get(JWT_ACCESS_TOKEN);

  if (jwt_token) {
    config.headers.Authorization = getBearerToken(jwt_token);
  }

  if (csrf_token) {
    config.headers['X-CSRFToken'] = csrf_token;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refresh_token = Cookies.get(JWT_REFRESH_TOKEN);

    // access token이 만료된 경우 token refresh 후 재요청
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
