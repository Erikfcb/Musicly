import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import { login, logout } from "../LocalStorage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      username: "",
      password: ""
    };
  }
  render() {
    const handleSubmit = async () => {
      const res = await axios.post("/api/login", {
        username: this.state.username.toLowerCase().trim(),
        password: this.state.password
      });

      if (!res.data.exist) {
        this.setState({
          error: (
            <h3 style={{ color: "red" }}>
              wrong username or password, please try again.
            </h3>
          )
        });
        localStorage.removeItem("token");
      }
      if (res.data.exist) {
        login(res.data.user._id); 
        this.props.login(res.data.user);

        this.setState({
          error: <Redirect to="/games" />
        });
      }
      // console.log("res.data:");
      // console.log(res.data);
      // const token = localStorage.getItem("token");
      // console.log("token saved: " + token);
    };

    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    const style = { textAlign: "center" };
    return (
      <div className="login container">
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
        </form>
        <button onClick={handleSubmit} className="btn blue">Log in</button>
        {this.state.error}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Login);
