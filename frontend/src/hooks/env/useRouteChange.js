import { useEffect } from 'react';
import { useHistory } from 'react-router';

const useRouteChange = (onRouteChangeCallback) => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      onRouteChangeCallback();
    });

    return () => {
      unlisten();
    };
  }, []);
};

export default useRouteChange;
