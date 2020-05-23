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
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const { isAuthenticated, user } = this.props;

    return (
      <Aux>
        <Header />
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <main className="main-content">{this.props.children}</main>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onTryAutoSignup: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
