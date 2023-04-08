import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { PostMessageDataType } from './app.types';
import useAppMessage from './useAppMessage';

const REDIRECT_KEY = 'REDIRECT';

const useAppRedirect = () => {
  const history = useHistory();

  const handleRedirect = useCallback(
    (data: PostMessageDataType) => {
      if (data.key !== REDIRECT_KEY) return;
      const { url } = data;
      history.push(url);
    },
    [history]
  );

  useAppMessage({ cb: handleRedirect, key: REDIRECT_KEY });
};

export default useAppRedirect;
