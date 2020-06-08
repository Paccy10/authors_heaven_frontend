/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Tabs,
  Tab,
  Paper,
  CircularProgress
} from '@material-ui/core';
import ReadMoreAndLess from 'react-read-more-less';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabPanel from '../../components/UI/TabPanel';
import Alert from '../../components/UI/Alert';
import profileImg from '../../assets/img/man.png';
import Article from '../../components/Article';
import * as actions from '../../store/actions';

class ViewProfile extends Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    const { onFetchUserProfile, onFetchUserArticles } = this.props;
    onFetchUserProfile().then(async () => {
      await onFetchUserArticles();
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  onEditProfile = () => {
    this.props.history.push('/profile/me/edit');
  };

  render() {
    const { loading, user, articles, history } = this.props;

    let profile = (
      <div className="loader">
        <CircularProgress color="primary" size={50} />
      </div>
    );

    if (!loading) {
      profile = (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} xl={2}>
            <div className="image-container">
              <img src={user.image ? user.image.url : profileImg} alt="" />
            </div>
            <div className="details">
              <p>
                <i className="fas fa-user"></i>
                <span>
                  {user.firstname} {user.lastname}
                </span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>{user.email}</span>
              </p>
              <div className="bio">
                <h2>Bio</h2>
                {user.bio ? (
                  <ReadMoreAndLess
                    className="read-more-content"
                    charLimit={100}
                    readMoreText="Show more"
                    readLessText="Show less"
                  >
                    {user.bio}
                  </ReadMoreAndLess>
                ) : (
                  <div className="no-bio">No bio added yet</div>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.onEditProfile}
              >
                Edit Profile
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} xl={10}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tabValue}
                textColor="primary"
                indicatorColor="primary"
                onChange={this.handleTabChange}
                scrollButtons="auto"
                variant="scrollable"
              >
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Articles</span>
                      <span>{articles.length}</span>
                    </div>
                  }
                  {...this.a11yProps(0)}
                />
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Followers</span>
                      <span></span>
                    </div>
                  }
                  {...this.a11yProps(1)}
                />
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Following</span>
                      <span>0</span>
                    </div>
                  }
                  {...this.a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <Paper>
              <TabPanel value={this.state.tabValue} index={0}>
                <Grid container spacing={2}>
                  {articles.map(article => (
                    <Grid key={article.id} item xs={12} sm={6}>
                      <Article article={article} history={history} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={2}>
                Item Three
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12}>
            <Card>
              <CardContent className="profile-card">
                <Alert />
                {profile}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ViewProfile.propTypes = {
  onFetchUserProfile: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  history: PropTypes.object,
  articles: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.profile.loading,
  user: state.profile.user,
  articles: state.profile.articles
});

const mapDispatchToProps = dispatch => ({
  onFetchUserProfile: () => dispatch(actions.fetchUserProfile()),
  onFetchUserArticles: () => dispatch(actions.fetchUserArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
