import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../Aux';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

class Layout extends Component {
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
};

export default Layout;
