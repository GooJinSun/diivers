import { RootState } from '@modules/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useScrollRestoration = () => {
  const { scrollY } = useSelector((state: RootState) => state.scrollReducer);

  useEffect(() => {
    window.scrollTo({ top: scrollY });
  }, []);
};
