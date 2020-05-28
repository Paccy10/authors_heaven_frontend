import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  vote: {},
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LIKE_ARTICLE_START:
    case actionTypes.DISLIKE_ARTICLE_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.LIKE_ARTICLE_SUCCESS:
    case actionTypes.DISLIKE_ARTICLE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        vote: payload.vote,
        loading: false
      });

    case actionTypes.LIKE_ARTICLE_FAIL:
    case actionTypes.DISLIKE_ARTICLE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
