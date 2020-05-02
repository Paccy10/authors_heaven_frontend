import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

class Navbar extends Component {
  state = {
    showMenu: false
  };

  onShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
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
          </ul>
        </nav>
        <div className="clearfix"></div>
      </header>
    );
  }
}

export default Navbar;
