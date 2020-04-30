import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import './assets/scss/main.scss';
import Layout from './components/hoc/layout/Layout';
import Home from './views/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e03997',
      },
      light: {
        main: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
