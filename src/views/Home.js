/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from '../components/HomeArticle';
import Alert from '../components/UI/Alert';
import * as actions from '../store/actions';

class Home extends Component {
  componentDidMount() {
    this.props.onFetchArticles();
  }

  onReadMore = articleSlug => {
    this.props.history.push(`/articles/${articleSlug}`);
  };

  render() {
    const { loading, articles } = this.props;

    return (
      <div className="container home">
        <Alert />
        {loading ? (
          <div className="loader">
            <CircularProgress color="primary" size={50} />
          </div>
        ) : (
          <Grid container spacing={4}>
            {articles.map((article, index) => (
              <Grid key={index} item xs={12} md={6}>
                <Article article={article} onReadMore={this.onReadMore} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  onFetchArticles: PropTypes.func,
  loading: PropTypes.bool,
  articles: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  articles: state.article.articles
});

const mapDispatchToProps = dispatch => ({
  onFetchArticles: () => dispatch(actions.fetchArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
