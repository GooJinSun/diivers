import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokensInCookies } from '../../utils/tokenCookiesHelpers';
import { getCurrentUser } from '../../modules/user';

const useAppLogin = () => {
  const dispatch = useDispatch();
  const handleMessage = (e) => {
    if (!e.data) return;
    const data = JSON.parse(e.data);
    const { key, access, refresh } = data;
    if (key !== 'SET_TOKEN') return;
    setTokensInCookies(access, refresh);
    dispatch(getCurrentUser());
  };

  useEffect(() => {
    // ios
    window.addEventListener('message', handleMessage);
    // android
    document.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      document.addEventListener('message', handleMessage);
    };
  }, []);
};

export default useAppLogin;
