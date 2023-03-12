import { MutableRefObject, useRef, useEffect } from 'react';

const useDepsFree = <T>(state: T): MutableRefObject<T> => {
  const ref = useRef<T>(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref;
};

export default useDepsFree;
