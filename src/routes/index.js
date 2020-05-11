import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/auth/Login';
import Signup from '../views/auth/Signup';
import UserActivation from '../views/auth/UserActivation';
import ForgotPassword from '../views/auth/ForgotPassword';
import ResetPassword from '../views/auth/ResetPassword';
import Logout from '../components/Logout';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/activate/:token" component={UserActivation} />
      <Route path="/auth/logout" component={Logout} />
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <Route path="/auth/reset-password/:token" component={ResetPassword} />
    </Switch>
  );
};

export default Routes;
