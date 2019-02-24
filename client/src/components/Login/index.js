import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { login, logout } from "../../LocalStorage";
import { Row, Input, Icon } from "react-materialize";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit() {
    
    const res = await axios.post("/api/login", {
      username: this.state.username.toLowerCase().trim(),
      password: this.state.password
    });

    console.log(res.status);    

    if (!res.data.exist) {
      this.setState({
        error: (
          <div style={{ color: "red" , marginTop: "10px"}}>
            wrong username or password, please try again.
          </div>
        )
      });
      localStorage.removeItem("token");
    }
    if (res.data.exist) {
      this.props.login(res.data.user);
      this.setState({
        error: <Redirect to="/games" />
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const style = { textAlign: "center" };
    return (
      <div className="container">
        <div className="container">
          <div className="container">
            <div className="login container">
              <h1 style={{ textAlign: "center" }}>Login now!</h1>

              <Row>
                <Input
                  s={12}
                  label="Username"
                  onChange={this.handleChange}
                  name="username"
                  value={this.state.username}
                >
                  <Icon>account_circle</Icon>
                </Input>
                <Input
                  type="password"
                  label="password"
                  s={12}
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                >
                  <Icon>dialpad</Icon>
                </Input>
              </Row>
              <button onClick={this.handleSubmit} className="btn blue">
                Log in
              </button>
              {this.state.error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Login);
