import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const fetchNotificationssStart = () => ({
  type: actionTypes.FETCH_NOTIFICATIONS_START
});

export const fetchNotificationsSuccess = (status, message, notifications) => ({
  type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
  payload: {
    status,
    message,
    notifications
  }
});

export const fetchNotificationsFail = (status, errors) => ({
  type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchNotifications = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchNotificationssStart());
    return axios
      .get('/notifications')
      .then(response => {
        dispatch(
          fetchNotificationsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.notifications
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchNotificationsFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
