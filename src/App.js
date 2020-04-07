import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/scss/main.scss';
import Home from './views/Home';
import Login from './views/auth/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;
