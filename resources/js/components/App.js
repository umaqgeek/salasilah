import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import { PrivateRoute } from './PrivateRoute';

import Icons from './Icons';

import * as Page from '../screens/index';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Page.MenuBar />
            <Switch>
              <Route exact path='/' component={Page.LoginPage} />

              <Route component={Page.NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
