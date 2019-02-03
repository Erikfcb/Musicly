import React, { Component } from "react";
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, Button, NavItem, Navbar } from "react-materialize";
import "../../style/header.css";

import * as actions from "../../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: ""
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect(route) {
    this.props.history.push(route);
  }

  render() {
    const logout = () => {
      localStorage.removeItem("token");
      this.props.logout();
    };

    const navigation =
      this.props.auth.logged || localStorage.getItem("token") != null ? (
        <div>
          <NavItem
            onClick={() => {
              const route = "/games";
              this.redirect(route);
            }}
          >
            Exercises
          </NavItem>
          <NavItem
            onClick={() => {
              const route = "/howto";
              this.redirect(route);
            }}
          >
            How to practice
          </NavItem>
          <NavItem
            onClick={() => {
              const route = "/contact";
              this.redirect(route);
            }}
          >
            Contact
          </NavItem>
          <NavItem
            onClick={() => {
              // console.log("logout!!!");
              // const route = "/login";
              this.redirect("/login");
              logout();
            }}
            className="logout"
          >
            Logout
          </NavItem>
        </div>
      ) : (
        <div>
          <NavItem
            onClick={() => {
              const route = "/howto";
              this.redirect(route);
            }}
          >
            How to practice
          </NavItem>
          <NavItem
            onClick={() => {
              const route = "/contact";
              this.redirect(route);
            }}
          >
            Contact
          </NavItem>
          <NavItem
            onClick={() => {
              const route = "/signup";
              this.redirect(route);
            }}
          >
            Sign up
          </NavItem>
          <NavItem
            onClick={() => {
              const route = "/login";
              this.redirect(route);
            }}
            className="login"
          >
            Login
          </NavItem>
        </div>
      );

    return (
      <Navbar
        brand="Musicly"
        className="header blue"
        right
        style={{ padding: "0 40px" }}
      >
        {navigation}
        {this.state.redirect}
      </Navbar>
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
)(withRouter(Header));
