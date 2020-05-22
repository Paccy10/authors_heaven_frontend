import axios from 'axios';
import * as actionTypes from './types';
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
