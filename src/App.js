import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import axios from 'axios';
import './assets/scss/main.scss';
import Layout from './components/hoc/layout/Layout';
import Home from './views/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

const REACT_APP_BACKEND_URL = 'https://authors-heaven-api.herokuapp.com/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e03997'
      },
      light: {
        main: '#fff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/signup" component={Signup} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
