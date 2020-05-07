import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import Alert from '../../components/UI/Alert';
import * as actions from '../../store/actions';

export class Login extends Component {
  state = {
    form: {
      email: {
        elementType: 'TextField',
        elementConfig: {
          type: 'email',
          name: 'email',
          label: 'E-mail Address',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        helperText: ''
      },
      password: {
        elementType: 'TextField',
        elementConfig: {
          type: 'password',
          name: 'password',
          label: 'Password',
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          autoComplete: 'new-password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        helperText: ''
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.form,
      [inputName]: {
        ...this.state.form[inputName],
        value: event.target.value,
        valid: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).isValid,
        touched: true,
        helperText: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).message
      }
    };
    let formIsValid = true;
    for (const inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  formSubmitHandler = () => {
    const { onLogin, onSetAlert } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }
    const formData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };
    onLogin(formData);
  };

  responseFacebook(response) {
    console.log(response);
  }

  responseGoogle(response) {
    console.log(response);
  }

  render() {
    const { loading, isAuthenticated } = this.props;
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>Sign In</h2>
                </div>
                <Alert />
                <form>
                  {form}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={this.formSubmitHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="primary" size={23} />
                    ) : (
                      'Login'
                    )}
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
                        render={renderProps => (
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
                        render={renderProps => (
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

Login.propTypes = {
  onSetAlert: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  authRedirectPath: state.auth.authRedirectPath,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onLogin: FormData => dispatch(actions.login(FormData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
