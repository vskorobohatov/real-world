import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import jwt from 'jsonwebtoken';

class PrivateRoute extends React.Component {
  render() {
    const {component: Component, ...rest} = this.props;
    const accessToken = jwt.decode(localStorage.getItem("token"));
    return (
      <Route
        {...rest}
        render={props =>
          (localStorage.getItem("token")&&(accessToken.exp>accessToken.iat) ?   (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: props.location},
              }}
            />
          ))
        }
      />
    );
  }
}
export default PrivateRoute;