import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../core/api-service';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(newProps) => {
      return isLoggedIn()
        ? <Component {...newProps} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: newProps.location }
          }}
        />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
