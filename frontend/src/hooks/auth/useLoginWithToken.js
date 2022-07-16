import { useEffect } from 'react';
import Cookies from 'js.cookie';
import { useDispatch, useSelector } from 'react-redux';
import { JWT_REFRESH_TOKEN } from '../../constants/cookies';
import { getCurrentUser } from '../../modules/user';

/**
 * 최초 어도어 접속시에 자동로그인이 가능한 상태인지(refresh token이 있는지) 확인하고 로그인을 시도
 */
const useLoginWithToken = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get(JWT_REFRESH_TOKEN) && !currentUser) {
      dispatch(getCurrentUser());
    }
  }, []);
};

export default useLoginWithToken;
