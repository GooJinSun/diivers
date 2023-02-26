import { RootState } from '@modules/index';
import { setScrollY } from '@modules/scroll';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

const useRestoreScroll = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const scrollState = useSelector((state: RootState) => state.scrollReducer);

  // 해당 페이지에서 스크롤 위치 기억
  useEffect(() => {
    const prevLocation = location.pathname;
    const unlisten = history.listen(() => {
      dispatch(setScrollY(window.scrollY, prevLocation));
    });

    return unlisten;
  }, [history, location, dispatch]);

  // 그 페이지에 맞는 위치로 스크롤
  useEffect(() => {
    const scrollY = scrollState[location.pathname];
    if (scrollY !== 0) {
      setTimeout(() => {
        window.scroll({
          top: scrollY,
          left: 0,
          behavior: 'auto'
        });
      }, 300);
    }
  }, [scrollState, location]);
};

export default useRestoreScroll;
