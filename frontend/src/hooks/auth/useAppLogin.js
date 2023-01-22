import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokensInCookies } from '../../utils/tokenCookiesHelpers';
import { getCurrentUser } from '../../modules/user';

const useAppLogin = () => {
  const dispatch = useDispatch();
  const handleMessage = useCallback(
    (e) => {
      if (!e.data) return;
      if (e.data.type === 'webpackWarnings') return;
      const parsedData = JSON.parse(e.data);
      const { key, access, refresh } = parsedData;
      if (key !== 'SET_TOKEN') return;
      setTokensInCookies(access, refresh);
      dispatch(getCurrentUser());
    },
    [dispatch]
  );

  useEffect(() => {
    // ios
    window.addEventListener('message', handleMessage);
    // android
    document.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      document.addEventListener('message', handleMessage);
    };
  }, [handleMessage]);
};

export default useAppLogin;
