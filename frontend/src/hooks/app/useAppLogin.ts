import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setTokensInCookies } from '../../utils/tokenCookiesHelpers';
import { getCurrentUser } from '../../modules/user';
import useAppMessage from './useAppMessage';
import { PostMessageDataType } from './app.types';

const SET_TOKEN_KEY = 'SET_TOKEN';

const useAppLogin = () => {
  const dispatch = useDispatch();
  const handleLogin = useCallback(
    (data: PostMessageDataType) => {
      if (data.key !== SET_TOKEN_KEY) return;
      const { access, refresh } = data;
      setTokensInCookies(access, refresh);
      dispatch(getCurrentUser());
    },
    [dispatch]
  );

  useAppMessage({ cb: handleLogin, key: SET_TOKEN_KEY });
};

export default useAppLogin;
