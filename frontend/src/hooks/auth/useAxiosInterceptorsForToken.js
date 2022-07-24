import { useEffect } from 'react';
import Cookies from 'js.cookie';
import { useDispatch } from 'react-redux';
import axios, { getBearerToken } from '../../apis';
import { JWT_REFRESH_TOKEN } from '../../constants/cookies';
import { setTokensInCookies } from '../../utils/tokenCookiesHelpers';
import { logout } from '../../modules/user';

/**
 * axios interceptor를 통해 모든 axios 요청의 응답을 확인해, 로그인을 유지하거나 로그아웃을 수행
 * access token이 만료된 경우 access token을 재발급 받아, 로그인을 유지함
 * refresh token이 만료된 경우 로그아웃
 */
const useAxiosInterceptorsForToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTokenInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // access token이 만료된 경우 refresh 토큰 refresh 요청
        // FIXME: Unauthorized 401 로 수정되면 수정 필요!
        if (error.response.status === 403) {
          try {
            const res = await axios.post('user/token/refresh/', {
              refresh: Cookies.get(JWT_REFRESH_TOKEN)
            });
            const { access, refresh } = res.data;

            setTokensInCookies(access, refresh);

            axios.defaults.headers.Authorization = getBearerToken(access);
            originalRequest.headers.Authorization = getBearerToken(access);

            return axios(originalRequest);
          } catch (err) {
            dispatch(logout());
          }
        }

        if (error.response.status === 401) {
          // refresh token이 만료된 경우 로그아웃
          if (originalRequest.url === 'user/token/refresh/') {
            dispatch(logout());
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshTokenInterceptor);
    };
  }, []);
};

export default useAxiosInterceptorsForToken;
