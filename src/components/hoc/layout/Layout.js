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
  }

  render() {
    return (
      <Aux>
        <Header />
        <Navbar />
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

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default connect(null, mapDispatchToProps)(Layout);
