import { RootState } from '@modules/index';
import { setIsBack, setScrollY } from '@modules/scroll';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function useRouterWithScroll() {
  const history = useHistory();
  const dispatch = useDispatch();

  const move = (href: string) => {
    dispatch(setScrollY(window.scrollY));
    history.push(href);
  };

  const back = () => {
    dispatch(setIsBack(true));
    history.back();
  };

  return { move, back };
}

export function useScrollRestoration() {
  const { scrollY, isBack } = useSelector(
    (state: RootState) => state.scrollReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isBack) {
      setTimeout(() => {
        window.scrollTo({ top: scrollY });
        dispatch(setIsBack(false));
      }, 0);
    }
  }, []);
}
