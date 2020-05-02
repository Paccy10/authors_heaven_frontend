import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  token: null,
  user: null,
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP_START:
      return updateObject(state, {
        status: null,
        message: null,
        errors: null,
        user: null,
        loading: true
      });

    case actionTypes.SIGNUP_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        user: payload.user,
        loading: false
      });

    case actionTypes.SIGNUP_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
