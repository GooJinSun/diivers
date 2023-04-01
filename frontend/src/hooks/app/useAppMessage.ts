import { useEffect } from 'react';

const useAppMessage = ({ cb }: { cb: () => void }) => {
  useEffect(() => {
    // ios
    window.addEventListener('message', cb);
    // android
    document.addEventListener('message', cb);
    return () => {
      window.removeEventListener('message', cb);
      document.removeEventListener('message', cb);
    };
  }, [cb]);
};

export default useAppMessage;
