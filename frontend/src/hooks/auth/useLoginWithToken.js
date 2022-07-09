import { useEffect, useState } from 'react';
import Cookies from 'js.cookie';
import { useDispatch, useSelector } from 'react-redux';
import { JWT_REFRESH_TOKEN } from '../../constants/cookies';
import { getCurrentUser } from '../../modules/user';

const useLoginWithToken = () => {
  const [refreshToken, setRefreshToken] = useState(
    Cookies.get(JWT_REFRESH_TOKEN)
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refreshToken) {
      dispatch(getCurrentUser());
    }
  }, [refreshToken]);

  return { currentUser, refreshToken, setRefreshToken };
};

export default useLoginWithToken;
