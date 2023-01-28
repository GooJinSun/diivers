import { RootState } from '@modules/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useRestoreScroll = () => {
  const { scrollY } = useSelector((state: RootState) => state.scrollReducer);

  useEffect(() => {
    window.scrollTo({ top: scrollY });
  }, []);
};

export default useRestoreScroll;
