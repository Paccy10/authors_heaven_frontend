import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/scss/main.scss';
import Layout from './components/hoc/layout/Layout';
import Home from './views/Home';
import Login from './views/auth/Login';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Layout>
  );
}

export default App;
