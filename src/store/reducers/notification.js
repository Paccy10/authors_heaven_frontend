import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  notifications: [],
  loading: false,
  errors: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_NOTIFICATIONS_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        notifications: payload.notifications,
        loading: false
      });

    case actionTypes.FETCH_NOTIFICATIONS_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
