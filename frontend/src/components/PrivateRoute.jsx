/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js.cookie';
import { JWT_REFRESH_TOKEN } from '../constants/cookies';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const refresh_token = Cookies.get(JWT_REFRESH_TOKEN);
  return (
    <Route
      {...rest}
      render={(props) =>
        refresh_token ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
