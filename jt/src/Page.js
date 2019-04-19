import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/LoginAndReg/NotFound';
import Login from './pages/LoginAndReg/Login';
import Reg from './pages/LoginAndReg/reg';
import FogetPwd from './pages/LoginAndReg/ForgotPassword';

import App from './App';


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />
            <Route path="/app" component={App} />
            {/*<Route exact path="/app" render={() => <Redirect to="/app/smartquotation" push />} />*/}
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route path="/fogetPwd" component={FogetPwd} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)