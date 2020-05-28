import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const likeArticleStart = () => ({
  type: actionTypes.LIKE_ARTICLE_START
});

export const likeArticleSuccess = (status, message, vote) => ({
  type: actionTypes.LIKE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const likeArticleFail = (status, errors) => ({
  type: actionTypes.LIKE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const likeArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(likeArticleStart());
    return axios
      .post(`/articles/${articleId}/like`)
      .then(response => {
        dispatch(
          likeArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            likeArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const dislikeArticleStart = () => ({
  type: actionTypes.DISLIKE_ARTICLE_START
});

export const dislikeArticleSuccess = (status, message, vote) => ({
  type: actionTypes.DISLIKE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const dislikeArticleFail = (status, errors) => ({
  type: actionTypes.DISLIKE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const dislikeArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(dislikeArticleStart());
    return axios
      .post(`/articles/${articleId}/dislike`)
      .then(response => {
        dispatch(
          dislikeArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            dislikeArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
