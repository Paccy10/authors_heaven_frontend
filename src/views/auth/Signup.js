import React, { Component } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import Alert from '../../components/UI/Alert';
import * as actions from '../../store/actions';

export class Signup extends Component {
  state = {
    form: {
      firstname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'firstname',
          label: 'Firstname',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
      },
      lastname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'lastname',
          label: 'Lastname',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
      },
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
        helperText: '',
        touched: false
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
        valid: false,
        validation: {
          required: true,
          minLength: 8
        },
        helperText: '',
        touched: false
      },

      confirmPassword: {
        elementType: 'TextField',
        elementConfig: {
          type: 'password',
          name: 'confirmPassword',
          label: 'Confirm Password',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
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

  formSubmitHandler = event => {
    event.preventDefault();
    const { onSetAlert } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
    }

    if (
      this.state.form.password.value !== this.state.form.confirmPassword.value
    ) {
      onSetAlert('Passwords do not match.', 'error');
    } else {
      console.log('Good to go');
    }
  };

  responseFacebook(response) {
    console.log(response);
  }

  responseGoogle(response) {
    console.log(response);
  }

  render() {
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
        helperText={formElement.config.helperText}
        touched={formElement.config.touched}
      />
    ));

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>Sign Up</h2>
                </div>
                <Alert />
                <form>
                  {form}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={this.formSubmitHandler}
                  >
                    Register
                  </Button>
                </form>

                <div className="links">
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
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
                            <i className="fab fa-facebook"></i> Signup with
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
                            <i className="fab fa-google-plus"></i> Signup with
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

Signup.propTypes = {
  onSetAlert: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType))
});

export default connect(null, mapDispatchToProps)(Signup);
