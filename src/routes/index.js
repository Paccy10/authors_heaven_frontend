import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../views/Home';
import Login from '../views/auth/Login';
import Signup from '../views/auth/Signup';
import UserActivation from '../views/auth/UserActivation';
import ForgotPassword from '../views/auth/ForgotPassword';
import ResetPassword from '../views/auth/ResetPassword';
import Logout from '../components/Logout';
import ViewProfile from '../views/users/ViewProfile';
import EditProfile from '../views/users/EditProfile';
import NewArticle from '../views/articles/NewArticle';
import ViewArticle from '../views/articles/ViewArticle';
import EditArticle from '../views/articles/EditArticle';
import PageNotFound from '../views/errors/404';
import Search from '../views/Search';

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
      <PrivateRoute exact path="/profile/me" component={ViewProfile} />
      <PrivateRoute path="/profile/me/edit" component={EditProfile} />
      <PrivateRoute path="/articles/new" component={NewArticle} />
      <Route exact path="/articles/:articleSlug" component={ViewArticle} />
      <PrivateRoute
        path="/articles/:articleSlug/edit"
        component={EditArticle}
      />
      <Route path="/search" component={Search} />
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
