/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';

export const signupStart = () => ({
  type: actionTypes.SIGNUP_START
});

export const signupSuccess = (status, message) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    status,
    message
  }
});

export const signupFail = (status, errors) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    status,
    errors
  }
});

export const signup = formData => {
  return dispatch => {
    dispatch(signupStart());
    return axios
      .post('/auth/signup', formData)
      .then(response => {
        dispatch(signupSuccess(response.data.status, response.data.message));
        dispatch(actions.setAlert(response.data.message, 'success'));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            signupFail(error.response.data.status, error.response.data.errors)
          );
          error.response.data.errors.map(err => {
            dispatch(actions.setAlert(err.msg, 'error'));
          });
        }
      });
  };
};

export const activateStart = () => ({
  type: actionTypes.ACTIVATE_START
});

export const activateSuccess = (status, message) => ({
  type: actionTypes.ACTIVATE_SUCCESS,
  payload: {
    status,
    message
  }
});

export const activateFail = (status, errors) => ({
  type: actionTypes.ACTIVATE_FAIL,
  payload: {
    status,
    errors
  }
});

export const activate = token => {
  return dispatch => {
    dispatch(activateStart());
    return axios
      .get(`/auth/activate/${token}`)
      .then(response => {
        dispatch(activateSuccess(response.data.status, response.data.message));
        dispatch(actions.setAlert(response.data.message, 'success'));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            activateFail(error.response.data.status, error.response.data.errors)
          );
          error.response.data.errors.map(err => {
            dispatch(actions.setAlert(err.msg, 'error'));
          });
        }
      });
  };
};

export const loginStart = () => ({
  type: actionTypes.LOGIN_START
});

export const loginSuccess = (status, message, token, user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    status,
    message,
    token,
    user
  }
});

export const loginFail = (status, errors) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: {
    status,
    errors
  }
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('user');
  return { type: actionTypes.LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (formData, type) => {
  return dispatch => {
    dispatch(loginStart());
    let url;
    if (type === 'local') url = '/auth/login';
    if (type === 'google') url = '/auth/login/google';
    if (type === 'facebook') url = '/auth/login/facebook';

    return axios
      .post(url, formData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(
          loginSuccess(
            response.data.status,
            response.data.message,
            response.data.data.token,
            response.data.data.user
          )
        );
        dispatch(checkAuthTimeout(86400));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            loginFail(error.response.data.status, error.response.data.errors)
          );
          error.response.data.errors.map(err => {
            dispatch(actions.setAlert(err.msg, 'error'));
          });
        }
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(loginSuccess(null, null, token, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
