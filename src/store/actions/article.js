/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const createArticleStart = () => ({
  type: actionTypes.CREATE_ARTICLE_START
});

export const createArticleSuccess = (status, message, article) => ({
  type: actionTypes.CREATE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    article
  }
});

export const createArticleFail = (status, errors) => ({
  type: actionTypes.CREATE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const createArticle = articleData => {
  return dispatch => {
    setAuthToken();
    dispatch(createArticleStart());

    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('body', articleData.body);
    formData.append('tags', articleData.tags);
    formData.append('image', articleData.image);

    return axios
      .post('/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        dispatch(
          createArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.article
          )
        );
        dispatch(actions.setAlert(response.data.message, 'success'));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            createArticleFail(
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