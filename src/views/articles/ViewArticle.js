/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Grid, Avatar, Paper, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import htmlParser from 'html-react-parser';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import Aux from '../../components/hoc/Aux';
import Comments from '../../components/Comments';

class ViewArticle extends Component {
  state = {
    hasLiked: false,
    hasDisliked: false,
    likes: 0,
    dislikes: 0,
    hasBookmarked: false,
    isGuest: false,
    rating: 0,
    loading: false
  };

  componentDidMount() {
    const { onFetchArticle, match, onFetchArticleRatings } = this.props;
    onFetchArticle(match.params.articleSlug).then(() => {
      const { votes, hasBookmarked, id } = this.props.article;
      onFetchArticleRatings(id).then(() => {
        const { ratings, user } = this.props;
        for (const rating of ratings) {
          if (rating.userId === user.id) {
            this.setState({ rating: rating.rating });
          }
        }
      });
      this.setState({
        hasLiked: votes.hasLiked,
        hasDisliked: votes.hasDisliked,
        likes: votes.likes,
        dislikes: votes.dislikes,
        hasBookmarked
      });
    });
  }

  likeArticle = () => {
    const { article, onLikeArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onLikeArticle(article.id).then(() => {
        const { voteMessage } = this.props;
        if (voteMessage === 'Article successfully liked') {
          let { dislikes } = this.state;
          const { hasDisliked, likes } = this.state;
          dislikes = hasDisliked ? dislikes - 1 : dislikes;
          this.setState({
            likes: likes + 1,
            hasLiked: true,
            dislikes,
            hasDisliked: false
          });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  dislikeArticle = () => {
    const { article, onDislikeArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onDislikeArticle(article.id).then(() => {
        const { voteMessage } = this.props;
        if (voteMessage === 'Article successfully disliked') {
          let { likes } = this.state;
          const { hasLiked, dislikes } = this.state;
          likes = hasLiked ? likes - 1 : likes;
          this.setState({
            likes,
            hasLiked: false,
            dislikes: dislikes + 1,
            hasDisliked: true
          });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  bookmarkArticle = () => {
    const { article, onBookmarkArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onBookmarkArticle(article.id).then(() => {
        const { bookmarkMessage } = this.props;
        if (bookmarkMessage === 'Article successfully bookmarked') {
          this.setState({ hasBookmarked: true });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  unbookmarkArticle = () => {
    const { article, onUnbookmarkArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onUnbookmarkArticle(article.id).then(() => {
        const { bookmarkMessage } = this.props;
        if (bookmarkMessage === 'Article successfully unbookmarked') {
          this.setState({ hasBookmarked: false });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  onRatingChange = (event, value) => {
    const { article, onRateArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.setState({ loading: true });
      const formData = { rating: value };
      onRateArticle(article.id, formData).then(() => {
        const { ratingMessage } = this.props;
        if (
          ratingMessage === 'Rating successfully updated' ||
          ratingMessage === 'Rating successfully created'
        ) {
          this.setState({ rating: value, loading: false });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  render() {
    const { loading, article, location } = this.props;
    const author = article.author || {};
    const {
      likes,
      dislikes,
      hasLiked,
      hasDisliked,
      hasBookmarked,
      isGuest,
      rating
    } = this.state;

    if (isGuest) {
      return (
        <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />
      );
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Paper className="article-container">
              {loading ? (
                <div className="loader">
                  <CircularProgress color="primary" size={50} />
                </div>
              ) : (
                <Aux>
                  <h1>{article.title}</h1>
                  <div className="avatar-container">
                    <Avatar
                      src={author.image ? author.image.url : null}
                      className="avatar"
                    />
                    <div className="username">
                      <span>
                        {author.firstname} {author.lastname}
                      </span>
                      <span>
                        {moment(article.createdAt).fromNow()} -{' '}
                        {article.readingTime} read
                      </span>
                    </div>
                  </div>
                  {article.image ? (
                    <div className="image-container">
                      <img src={article.image.url} alt="" />
                    </div>
                  ) : null}
                  {article.tags ? (
                    <div className="tags">
                      {article.tags.map((tag, index) => (
                        <div key={index} className="tag">
                          <span>#</span>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="article-body">
                    {article.body ? htmlParser(article.body) : null}
                  </div>
                  <div className="actions">
                    <div className="ratings">
                      <Rating
                        name="article-rating"
                        value={rating}
                        size="medium"
                        onChange={this.onRatingChange}
                        className="rating"
                      />{' '}
                      {this.state.loading ? 'Please wait...' : ''}
                    </div>
                    <div className="votes">
                      <span className={hasLiked ? 'voted' : null}>
                        <i
                          className="fas fa-heart"
                          onClick={this.likeArticle}
                        ></i>{' '}
                        {likes}
                      </span>
                      <span className={hasDisliked ? 'voted' : null}>
                        <i
                          className="fas fa-heart-broken"
                          onClick={this.dislikeArticle}
                        ></i>{' '}
                        {dislikes}
                      </span>
                      <span className={hasBookmarked ? 'voted' : null}>
                        <i
                          className="fas fa-bookmark"
                          onClick={
                            hasBookmarked
                              ? this.unbookmarkArticle
                              : this.bookmarkArticle
                          }
                        ></i>
                      </span>
                    </div>
                    <div className="report">
                      <span>
                        <i className="fas fa-ellipsis-h"></i>
                      </span>
                    </div>
                  </div>
                  <Comments articleId={article.id} location={location} />
                </Aux>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ViewArticle.propTypes = {
  onFetchArticle: PropTypes.func,
  onLikeArticle: PropTypes.func,
  onDislikeArticle: PropTypes.func,
  onBookmarkArticle: PropTypes.func,
  onUnbookmarkArticle: PropTypes.func,
  loading: PropTypes.bool,
  article: PropTypes.object,
  match: PropTypes.object,
  voteMessage: PropTypes.string,
  bookmarkMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  onFetchArticleRatings: PropTypes.func,
  user: PropTypes.object,
  ratings: PropTypes.array,
  onRateArticle: PropTypes.func,
  ratingMessage: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  user: state.auth.user,
  loading: state.article.loading,
  article: state.article.articles[0] || {},
  voteMessage: state.vote.message,
  bookmarkMessage: state.bookmark.message,
  ratingMessage: state.rating.message,
  ratings: state.rating.ratings
});

const mapDispatchToProps = dispatch => ({
  onFetchArticle: articleSlug => dispatch(actions.fetchArticle(articleSlug)),
  onLikeArticle: articleId => dispatch(actions.likeArticle(articleId)),
  onDislikeArticle: articleId => dispatch(actions.dislikeArticle(articleId)),
  onBookmarkArticle: articleId => dispatch(actions.bookmarkArticle(articleId)),
  onUnbookmarkArticle: articleId =>
    dispatch(actions.unbookmarkArticle(articleId)),
  onFetchArticleRatings: articleId =>
    dispatch(actions.fetchArticleRatings(articleId)),
  onRateArticle: (articleId, formData) =>
    dispatch(actions.rateArticle(articleId, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
