import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="social-media">
          <div className="icon instagram-icon">
            <Link to="/">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
          <div className="icon twitter-icon">
            <Link to="/">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
          <div className="icon">
            <Link to="/">
              <i className="fab fa-facebook"></i>
            </Link>
          </div>
        </div>
        <div className="search">
          <div>
            <input
              className="input-field"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div>
            <Button className="btn btn-primary">
              <i className="fa fa-search"></i>
              Search
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
