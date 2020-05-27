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
  componentDidMount() {
    const { onFetchArticle, match } = this.props;
    onFetchArticle(match.params.articleSlug);
  }

  render() {
    const { loading, article } = this.props;
    const author = article.author || {};

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
  loading: PropTypes.bool,
  article: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  article: state.article.articles[0] || {}
});

const mapDispatchToProps = dispatch => ({
  onFetchArticle: articleSlug => dispatch(actions.fetchArticle(articleSlug))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
