import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import axios from "axios";
import * as EmailValidator from "email-validator";
import { loginById } from "../actions";
import { Row, Input, Icon } from "react-materialize";

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
      if (
        this.state.password === "" ||
        this.state.username === "" ||
        this.state.email === ""
      ) {
        this.setState({
          exist: <p style={{ color: "red" }}>Please enter your details.</p>
        });
      }
      let validEmail = "";
      if (this.state.email !== "") {
        validEmail = EmailValidator.validate(this.state.email);
      }

      if (validEmail === false) {
        this.setState({
          exist: <p style={{ color: "red" }}>Invalid email.</p>
        });
      }

      if (
        validEmail &&
        validEmail !== "" &&
        this.state.password !== "" &&
        this.state.username !== ""
      ) {
        const res = await axios.post("/api/signup/checkexist", {
          email: this.state.email.toLowerCase().trim(),
          username: this.state.username.toLowerCase().trim()
        });
        console.log("mail: " + res.data.email);
        console.log("username: " + res.data.username);

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

        if (
          res.data.email === false &&
          res.data.username === false &&
          this.state.password !== "" &&
          this.state.username !== ""
        ) {
          const resId = await axios.post("/api/signup/new", {
            email: this.state.email.toLowerCase().trim(),
            password: this.state.password,
            username: this.state.username.toLowerCase().trim()
          });

          this.props.loginById(resId.data.id);

          this.setState({
            exist: <Redirect to="/games" />
          });
        }
      }
    };

    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    const toLogin = this.state.flag ? <Redirect to="/login" /> : "";

    return (
      <div className="container">
        <div className="container">
          <div className="container">
            <div className="signup container">
              {toLogin}
              <h1 style={style}>Sign up for free!</h1>

              <Row>
                <Input
                  type="text"
                  s={12}
                  label="Username"
                  onChange={handleChange}
                  name="username"
                  value={this.state.username}
                >
                  <Icon>account_circle</Icon>
                </Input>
                <Input
                  type="password"
                  label="password"
                  s={12}
                  onChange={handleChange}
                  name="password"
                  value={this.state.password}
                >
                  <Icon>dialpad</Icon>
                </Input>
                <Input
                  type="email"
                  label="Email"
                  s={12}
                  onChange={handleChange}
                  name="email"
                  value={this.state.email}
                >
                  <Icon>email</Icon>
                </Input>
              </Row>
              <button onClick={handleSubmit} className="btn blue">
                Submit
              </button>
              {this.state.exist}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loginById }
)(SignUp);
