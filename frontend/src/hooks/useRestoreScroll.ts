import { RootState } from '@modules/index';
import { setScrollY } from '@modules/scroll';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useRestoreScroll = () => {
  console.log('useRestoreScroll');
  console.log(window.scrollY, window.location.pathname);
  const dispatch = useDispatch();
  const scrollState = useSelector((state: RootState) => state.scrollReducer);

  useEffect(() => {
    console.log(scrollState);
    if (scrollState[window.location.pathname]) {
      window.scrollTo({ top: scrollState[window.location.pathname] });
    }
    return () => {
      dispatch(setScrollY(window.scrollY, window.location.pathname));
    };
  }, [dispatch, scrollState]);
};

export default useRestoreScroll;
