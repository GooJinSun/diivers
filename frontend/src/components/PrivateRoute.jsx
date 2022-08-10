import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js.cookie';
import { JWT_REFRESH_TOKEN } from '../constants/cookies';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  const refreshToken = Cookies.get(JWT_REFRESH_TOKEN);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentUserRequest = useSelector(
    (state) => state.loadingReducer['user/GET_CURRENT_USER']
  );

  useEffect(() => {
    if (currentUserRequest !== 'FAILURE') return;
    history.push('/login');
  }, [currentUserRequest]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (refreshToken || currentUser) {
          return <Component {...props} {...rest} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
