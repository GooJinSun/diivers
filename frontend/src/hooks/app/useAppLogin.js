import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setTokensInCookies } from '../../utils/tokenCookiesHelpers';
import { getCurrentUser } from '../../modules/user';
import useAppMessage from './useAppMessage';

const useAppLogin = () => {
  const dispatch = useDispatch();
  const handleLogin = useCallback(
    (e) => {
      if (e.data) {
        const data = JSON.stringify(e.data);
        const { key, access, refresh } = data;
        if (key !== 'SET_TOKEN') return;
        setTokensInCookies(access, refresh);
        dispatch(getCurrentUser());
      }
    },
    [dispatch]
  );

  useAppMessage(handleLogin);
};

export default useAppLogin;
