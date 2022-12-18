import { useCallback, useEffect, useState } from 'react';

const useInfiniteScroll = (onIntersectCallback) => {
  const [target, setTarget] = useState();

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        onIntersectCallback();
      }
    },
    [onIntersectCallback]
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return setTarget;
};

export default useInfiniteScroll;
