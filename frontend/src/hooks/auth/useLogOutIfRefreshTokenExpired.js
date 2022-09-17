import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../apis';
import { logout } from '../../modules/user';

/**
 * axios interceptor를 통해 모든 axios 요청의 응답을 확인해
 * refresh token이 만료된 경우 로그아웃
 */
const useLogOutIfRefreshTokenExpired = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(logout());
    history.push('/login');
  };

  useEffect(() => {
    const refreshTokenInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status !== 401) return Promise.reject(error);

        const originalRequest = error.config;

        // refresh token이 만료된 경우 로그아웃
        if (originalRequest.url === 'user/token/refresh/') {
          logOut();
        }
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshTokenInterceptor);
    };
  }, [dispatch]);
};

export default useLogOutIfRefreshTokenExpired;
