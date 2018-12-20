import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router";
import axios from "axios";
import * as EmailValidator from "email-validator";
import {
  loginById
} from '../actions'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exist: "",
      username: "",
      password: "",
      email: ""
    };
  }
  render() {
    const style = { textAlign: "center" };

    const handleSubmit = async () => {
      let validEmail = "";
      if (this.state.email !== "") {
        validEmail = EmailValidator.validate(this.state.email);
      }

      if (validEmail === false) {
        this.setState({
          exist: <p style={{ color: "red" }}>Invalid email.</p>
        });
      }
      if (validEmail && validEmail !== "") {
        const res = await axios.post("/api/signup/checkexist", {
          email: this.state.email.toLowerCase().trim(),
          username: this.state.username.toLowerCase().trim()
        });

        if (res.data.email) {
          this.setState({
            exist: (
              <p style={{ color: "red" }}>
                Email already exists in our database, try to log in.
              </p>
            )
          });
        }

        if (res.data.username) {
          this.setState({
            exist: (
              <p style={{ color: "red" }}>
                Username already exists, try another one.
              </p>
            )
          });
        }

        if (!res.data.email && !res.data.username) {
          const resId = await axios.post("/api/signup/new", {
            email: this.state.email.toLowerCase().trim(),
            password: this.state.password,
            username: this.state.username.toLowerCase().trim()
          });

          this.props.loginById(resId.data.id);

          this.setState({
            exist: <Redirect to='/games' />
          });
        }
      }
    };

    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    const toLogin = this.state.flag ? <Redirect to="/login" /> : "";

    return (
      <div className="signup container">
        {toLogin}
        <h1 style={style}>Sign up for free!</h1>
        <form>
          <label>Username: </label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            value={this.state.username}
          />
          <label>Password: </label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={this.state.password}
          />
          <label>Email: </label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={this.state.email}
          />
        </form>
        <button onClick={handleSubmit} className="btn blue">
          Submit
        </button>
        {this.state.exist}
      </div>
    );
  }
}


export default connect(
  null,
  { loginById }
)(SignUp);
