import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useAppMessage from './useAppMessage';

const useAppRedirect = () => {
  const history = useHistory();

  const handleRedirect = useCallback(
    (e) => {
      if (e.data) {
        const data = JSON.stringify(e.data);
        const { key, url } = data;
        if (key !== 'REDIRECT') return;
        history.push(url);
      }
    },
    [history]
  );

  useAppMessage(handleRedirect);
};

export default useAppRedirect;
