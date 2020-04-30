import React, { Component } from 'react';
import { Grid, Card, CardContent, TextField, Button } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

export class Login extends Component {
  responseFacebook(response) {
    console.log(response);
  }

  responseGoogle(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>Sign In</h2>
                </div>
                <form>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="input-field"
                  />
                  <TextField
                    type="password"
                    id="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="input-field"
                    autoComplete="new-password"
                  />
                  <Button variant="contained" color="primary" fullWidth>
                    Login
                  </Button>
                </form>

                <div className="links">
                  <span>
                    <Link to="/forgot-password">Forgot Password</Link>
                  </span>
                  <span>
                    Don&apos;t have an account?{' '}
                    <Link to="/signup">Register</Link>
                  </span>
                </div>

                <div className="social-buttons">
                  <Grid container spacing={2}>
                    <Grid item xs={12} xl={6}>
                      <FacebookLogin
                        appId="249893146047297"
                        render={(renderProps) => (
                          <button
                            type="button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn btn-facebook"
                          >
                            <i className="fab fa-facebook"></i> Login with
                            Facebook
                          </button>
                        )}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                      />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                      <GoogleLogin
                        clientId="771354043241-ceu8ei0ttj7f4u0i06qp9o9cs5tnolbj.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <button
                            type="button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn btn-google"
                          >
                            <i className="fab fa-google-plus"></i> Login with
                            Google
                          </button>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
