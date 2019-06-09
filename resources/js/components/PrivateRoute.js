import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { ScreenList } from '../utilities/Roles';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      {
        if (localStorage.getItem('userId') && localStorage.getItem('authToken')) {
          const token = localStorage.getItem('authToken');
          const bearerToken = `Bearer ${token}`;
          axios.get('/api/user/'+localStorage.getItem('userId'), {
            headers: {
              'Authorization': bearerToken,
            }
          })
          .then(res => {
            const isAllowed = ScreenList(res.data.user_type, props.location.pathname);
            if (!isAllowed) {
              props.history.push('/accessdenied');
            }
            localStorage.setItem('userData', JSON.stringify(res.data));
          })
          .catch(err => {
            props.history.push('/logoutpage');
          });
        }
        return localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        );
      }
    }
  />
);
