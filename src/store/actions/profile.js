/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchUserProfileStart = () => ({
  type: actionTypes.FETCH_USER_PROFILE_START
});

export const fetchUserProfileSuccess = (status, message, user) => ({
  type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: {
    status,
    message,
    user
  }
});

export const fetchUserProfileFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_PROFILE_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserProfile = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserProfileStart());
    return axios
      .get('/users/me')
      .then(response => {
        dispatch(
          fetchUserProfileSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserProfileFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const updateUserProfileStart = () => ({
  type: actionTypes.UPDATE_USER_PROFILE_START
});

export const updateUserProfileSuccess = (status, message, user) => ({
  type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: {
    status,
    message,
    user
  }
});

export const updateUserProfileFail = (status, errors) => ({
  type: actionTypes.UPDATE_USER_PROFILE_FAIL,
  payload: {
    status,
    errors
  }
});

export const updateUserProfile = profileData => {
  return dispatch => {
    setAuthToken();
    dispatch(updateUserProfileStart());

    const formData = new FormData();
    formData.append('firstname', profileData.firstname);
    formData.append('lastname', profileData.lastname);
    formData.append('bio', profileData.bio);
    formData.append('image', profileData.image);

    return axios
      .put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        dispatch(
          updateUserProfileSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
        dispatch(actions.setAlert(response.data.message, 'success'));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(actions.authCheckState());
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            updateUserProfileFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
          error.response.data.errors.map(err => {
            dispatch(actions.setAlert(err.msg, 'error'));
          });
        }
      });
  };
};
