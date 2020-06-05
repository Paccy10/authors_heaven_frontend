/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../Aux';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import * as actions from '../../../store/actions';

class Layout extends Component {
  async componentDidMount() {
    await this.props.onTryAutoSignup();
    this.props.onFetchNotifications();
  }

  render() {
    const { isAuthenticated, user, notifications } = this.props;

    return (
      <Aux>
        <Header />
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          notifications={notifications}
        />
        <main className="main-content">{this.props.children}</main>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onTryAutoSignup: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  onFetchNotifications: PropTypes.func,
  notifications: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null,
  notifications: state.notification.notifications
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  onFetchNotifications: () => dispatch(actions.fetchNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
