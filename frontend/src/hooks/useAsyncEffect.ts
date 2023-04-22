import React from 'react';

const useAsyncEffect = (func: Function, dependency: Array<any>) => {
  React.useEffect(() => {
    (async () => {
      await func();
    })();
  }, dependency);
};

export default useAsyncEffect;
