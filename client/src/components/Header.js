import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/header.css";

import * as actions from "../actions";

class Header extends Component {
  render() {
    const logout = () => {
      localStorage.removeItem("token");
      this.props.logout();
    };

    const navigation = this.props.auth.logged ? (
      <ul class="right">
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link onClick={logout} to="/" className="logout">
            Logout
          </Link>
        </li>
      </ul>
    ) : (
      <ul id="nav" class="right">
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login" className="login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav>
        <div class="nav-wrapper blue">
          <Link to="/" className="brand-logo">
            Musicly
          </Link>
          {navigation}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // to be able to use this.props.auth
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(Header);
