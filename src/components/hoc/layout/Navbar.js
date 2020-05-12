/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Badge } from '@material-ui/core';
import classNames from 'classnames';
import logo from '../../../assets/img/logo.png';
import Aux from '../Aux';

class Navbar extends Component {
  state = {
    showMenu: false,
    showNotifications: false,
    showProfile: false
  };

  componentDidMount() {
    global.document.addEventListener('click', this.onShowNotifications, false);
    global.document.addEventListener('click', this.onShowProfile, false);
  }

  componentWillUnmount() {
    global.document.removeEventListener(
      'click',
      this.onShowNotifications,
      false
    );
    global.document.removeEventListener('click', this.onShowProfile, false);
  }

  onShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  onShowNotifications = event => {
    if (
      event.target.id !== 'notifications-bell' &&
      this.state.showNotifications
    ) {
      this.setState({ showNotifications: false });
    }
  };

  onShowProfile = event => {
    if (event.target.id !== 'username' && this.state.showProfile) {
      this.setState({ showProfile: false });
    }
  };

  render() {
    const { isAuthenticated, user } = this.props;
    return (
      <header className="navbar">
        <Link to="/" className="logo">
          <div>
            <img src={logo} alt="" />
          </div>
        </Link>
        <div
          className={`menu-toggle ${this.state.showMenu ? 'active' : ''}`}
          onClick={this.onShowMenu}
        ></div>
        <nav className={`${this.state.showMenu ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/categories">
                Categories
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <Aux>
                <li>
                  <NavLink activeClassName="active" to="/auth/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/auth/signup">
                    Signup
                  </NavLink>
                </li>
              </Aux>
            ) : (
              <Aux>
                <li
                  className={classNames({
                    notifications: true,
                    active: this.state.showNotifications
                  })}
                >
                  <i
                    id="notifications-bell"
                    className={classNames({ far: true, 'fa-bell': true })}
                    onClick={_event => {
                      this.setState({
                        showNotifications: !this.state.showNotifications
                      });
                    }}
                  ></i>
                  <span className="notifications-badge">0</span>
                  <div className="notifications-sub-menu">
                    <ul>
                      <li>
                        <div className="icon">
                          <i className="fas fa-flag-checkered"></i>
                        </div>
                        <div className="message">
                          Manzi Fabrice has liked your article
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-flag-checkered"></i>
                        </div>
                        <div className="message">
                          Manzi Fabrice has liked your article
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-flag-checkered"></i>
                        </div>
                        <div className="message">
                          Manzi Fabrice has liked your article
                        </div>
                      </li>
                      <li className="show-all">
                        <p>Show All Notifications</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className={classNames({
                    'avatar-container': true,
                    active: this.state.showProfile
                  })}
                >
                  <div className="profile">
                    <Avatar src={user.image} className="avatar" />
                    <span
                      id="username"
                      className={classNames({ username: true })}
                      onClick={_event => {
                        this.setState({ showProfile: !this.state.showProfile });
                      }}
                    >
                      {user.firstname}
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                  <div className="profile-sub-menu">
                    <ul>
                      <li>
                        <Link to="/">
                          {' '}
                          <i className="fa fa-folder-plus"></i> New Article
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile">
                          {' '}
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          {' '}
                          <i className="fa fa-cog"></i> Settings
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/logout">
                          <i className="fa fa-sign-out-alt"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </Aux>
            )}
          </ul>
        </nav>
        <div className="clearfix"></div>
      </header>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
