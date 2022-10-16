import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js.cookie';
import { JWT_REFRESH_TOKEN } from '@constants/cookies';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const refreshToken = Cookies.get(JWT_REFRESH_TOKEN);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

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
