import { useEffect } from 'react';
import Cookies from 'js.cookie';
import { useDispatch, useSelector } from 'react-redux';
import { JWT_REFRESH_TOKEN } from '../../constants/cookies';
import { getCurrentUser } from '../../modules/user';

const useLoginWithToken = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get(JWT_REFRESH_TOKEN) && !currentUser) {
      dispatch(getCurrentUser());
    }
  }, []);
};

export default useLoginWithToken;
