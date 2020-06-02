/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { CircularProgress, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Alert from './UI/Alert';
import Input from './UI/Input';
import Button from './UI/Button';
import Aux from './hoc/Aux';
import validate from '../utils/validation';
import * as actions from '../store/actions';

class Comments extends Component {
  state = {
    form: {
      body: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'body',
          label: 'Comment',
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          multiline: true,
          rows: 5
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        helperText: ''
      }
    },
    formIsValid: false,
    comments: [],
    loadComments: false,
    loading: false
  };

  componentDidMount() {
    const { onFetchArticleComments, articleId } = this.props;
    if (articleId) {
      this.setState({ loadComments: true });
      onFetchArticleComments(articleId).then(() => {
        const { message, comments } = this.props;
        if (message === 'Comments successfully fetched') {
          this.setState({ comments, loadComments: false });
        }
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.message === 'Comment successfully created') {
      const updatedForm = {
        ...this.state.form
      };
      for (const inputIdentifier in updatedForm) {
        updatedForm[inputIdentifier].value = '';
        updatedForm[inputIdentifier].valid = false;
        updatedForm[inputIdentifier].touched = false;
      }

      this.setState({ form: updatedForm, formIsValid: false });
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.form,
      [inputName]: {
        ...this.state.form[inputName],
        value: event.target.value,
        valid: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).isValid,
        touched: true,
        helperText: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).message
      }
    };
    let formIsValid = true;
    for (const inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  formSubmitHandler = async event => {
    event.preventDefault();
    const { onCommentArticle, onSetAlert, articleId } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please add your comment', 'error');
      return;
    }
    const formData = {
      body: this.state.form.body.value
    };
    this.setState({ loading: true });
    onCommentArticle(articleId, formData).then(() => {
      const { message, comments } = this.props;
      if (message === 'Comment successfully created') {
        const cmts = [...this.state.comments];
        cmts.unshift(comments[0]);
        this.setState({ comments: cmts, loading: false });
      }
    });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    const { isAuthenticated, user, loading } = this.props;
    const { loadComments, comments } = this.state;

    return (
      <div className="comments-container">
        <Alert />
        {isAuthenticated ? (
          <div className="form">
            <Avatar
              src={user.image ? user.image.url : null}
              className="avatar"
            />
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <Button
                className="btn btn-secondary"
                disabled={loading && this.state.loading}
              >
                {loading && this.state.loading ? (
                  <CircularProgress color="secondary" size={23} />
                ) : (
                  'Post Comment'
                )}
              </Button>
            </form>
          </div>
        ) : (
          <h3>Comments</h3>
        )}
        {loading && loadComments ? (
          <div className="loader">
            <CircularProgress color="secondary" size={23} />
          </div>
        ) : (
          <Aux>
            {comments.map((comment, index) => (
              <div className="comments" key={index}>
                <div className="comment">
                  <Avatar
                    src={comment.user.image ? comment.user.image.url : null}
                    className="avatar"
                  />
                  <div className="comment-body">
                    <div className="username">
                      <span>
                        {comment.user.firstname} {comment.user.lastname}
                      </span>{' '}
                      <span>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <div className="body">{comment.body}</div>
                    <div className="comment-actions">
                      <span>
                        <i className="fas fa-heart"></i> {comment.votes.likes}
                      </span>
                      <span>
                        <i className="fas fa-heart-broken"></i>{' '}
                        {comment.votes.dislikes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Aux>
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  articleId: PropTypes.number,
  loading: PropTypes.bool,
  message: PropTypes.string,
  comments: PropTypes.array,
  onSetAlert: PropTypes.func,
  onCommentArticle: PropTypes.func,
  onFetchArticleComments: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.comment.loading,
  comments: state.comment.comments,
  message: state.comment.message,
  isAuthenticated: state.auth.token !== null,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onCommentArticle: (articleId, formData) =>
    dispatch(actions.commentArticle(articleId, formData)),
  onFetchArticleComments: articleId =>
    dispatch(actions.fetchArticleComments(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
