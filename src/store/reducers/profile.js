import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  user: {},
  articles: [],
  followers: [],
  following: [],
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_USER_PROFILE_START:
    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        user: payload.user,
        loading: false
      });

    case actionTypes.FETCH_USER_PROFILE_FAIL:
    case actionTypes.UPDATE_USER_PROFILE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
