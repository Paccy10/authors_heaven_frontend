import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  user: {},
  articles: [],
  followers: [],
  followees: [],
  errors: null,
  loadingProfile: false,
  loadingArticles: false,
  loadingFollowers: false,
  loadingFollowees: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_USER_PROFILE_START:
    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateObject(state, {
        ...initialState,
        loadingProfile: true
      });

    case actionTypes.FETCH_USER_ARTICLES_START:
      return updateObject(state, {
        status: null,
        message: null,
        articles: [],
        loadingArticles: true
      });

    case actionTypes.FETCH_USER_FOLLOWERS_START:
      return updateObject(state, {
        status: null,
        message: null,
        followers: [],
        loadingFollowers: true
      });

    case actionTypes.FETCH_USER_FOLLOWEES_START:
      return updateObject(state, {
        status: null,
        message: null,
        followees: [],
        loadingFollowees: true
      });

    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        user: payload.user,
        loadingProfile: false
      });

    case actionTypes.FETCH_USER_ARTICLES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        articles: payload.articles,
        loadingArticles: false
      });

    case actionTypes.FETCH_USER_FOLLOWERS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        followers: payload.followers,
        loadingFollowers: false
      });

    case actionTypes.FETCH_USER_FOLLOWEES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        followees: payload.followees,
        loadingFollowees: false
      });

    case actionTypes.FETCH_USER_PROFILE_FAIL:
    case actionTypes.UPDATE_USER_PROFILE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingProfile: false
      });

    case actionTypes.FETCH_USER_ARTICLES_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingArticles: false
      });

    case actionTypes.FETCH_USER_FOLLOWERS_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingFollowers: false
      });

    case actionTypes.FETCH_USER_FOLLOWEES_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingFollowees: false
      });

    default:
      return state;
  }
}
