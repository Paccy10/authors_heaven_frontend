import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  articles: [],
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_ARTICLE_START:
    case actionTypes.FETCH_ARTICLES_START:
    case actionTypes.FETCH_ARTICLE_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.CREATE_ARTICLE_SUCCESS:
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        articles: state.articles.concat(payload.article),
        loading: false
      });

    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        articles: payload.articles,
        loading: false
      });

    case actionTypes.CREATE_ARTICLE_FAIL:
    case actionTypes.FETCH_ARTICLES_FAIL:
    case actionTypes.FETCH_ARTICLE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
