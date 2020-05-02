/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';

export const signupStart = () => ({
  type: actionTypes.SIGNUP_START
});

export const signupSuccess = (status, message, user) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    status,
    message,
    user
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
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(
          signupSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
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
