/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Grid, Avatar, Paper, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import htmlParser from 'html-react-parser';
import * as actions from '../../store/actions';
import Aux from '../../components/hoc/Aux';
import Alert from '../../components/UI/Alert';

class ViewArticle extends Component {
  state = {
    hasLiked: false,
    hasDisliked: false,
    likes: 0,
    dislikes: 0
  };

  componentDidMount() {
    const { onFetchArticle, match } = this.props;
    onFetchArticle(match.params.articleSlug).then(() => {
      const { votes } = this.props.article;
      this.setState({
        hasLiked: votes.hasLiked,
        hasDisliked: votes.hasDisliked,
        likes: votes.likes,
        dislikes: votes.dislikes
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { likes, dislikes } = this.state;
    const { hasLiked, hasDisliked } = this.state;
    if (nextProps.message === 'Article successfully liked') {
      dislikes = hasDisliked ? dislikes - 1 : dislikes;
      this.setState({
        likes: likes + 1,
        hasLiked: true,
        dislikes,
        hasDisliked: false
      });
    }

    if (nextProps.message === 'Article successfully disliked') {
      likes = hasLiked ? likes - 1 : likes;
      this.setState({
        likes,
        hasLiked: false,
        dislikes: dislikes + 1,
        hasDisliked: true
      });
    }
  }

  likeArticle = () => {
    const { article, onLikeArticle } = this.props;
    onLikeArticle(article.id);
  };

  dislikeArticle = () => {
    const { article, onDislikeArticle } = this.props;
    onDislikeArticle(article.id);
  };

  render() {
    const { loading, article } = this.props;
    const author = article.author || {};
    const { likes, dislikes, hasLiked, hasDisliked } = this.state;

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Paper className="article-container">
              <Alert />
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
                      <span>{moment(article.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className="reading-time">
                    Read Time: {article.readingTime}
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
                    <div className="ratings"></div>
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
                      <span>
                        <i className="fas fa-bookmark"></i>
                      </span>
                    </div>
                    <div className="report">
                      <span>
                        <i className="fas fa-ellipsis-h"></i>
                      </span>
                    </div>
                  </div>
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
  loading: PropTypes.bool,
  article: PropTypes.object,
  match: PropTypes.object,
  message: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  article: state.article.articles[0] || {},
  message: state.vote.message
});

const mapDispatchToProps = dispatch => ({
  onFetchArticle: articleSlug => dispatch(actions.fetchArticle(articleSlug)),
  onLikeArticle: articleId => dispatch(actions.likeArticle(articleId)),
  onDislikeArticle: articleId => dispatch(actions.dislikeArticle(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
