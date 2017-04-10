import React from 'react';
import { Router, Route } from 'react-router';

import App from './components';
import Home from './components/Home';
import Login from './components/Login';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';

const Routes = () => (
  <Router>
    <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route component={EnsureLoggedInContainer}>
            <Route path="home" component={Home}/>
        </Route>
    </Route>
  </Router>
);

export default Routes;