import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components';
import Home from './components/home';
import Login from './components/login';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route component={EnsureLoggedInContainer}>
            <Route path="home" component={Home}/>
        </Route>
    </Route>
  </Router>
);

export default Routes;