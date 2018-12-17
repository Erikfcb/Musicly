import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import axios from "axios";

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

      const res = await axios.post("/api/signup/checkexist", {
        email: this.state.email.toLowerCase().trim(),
        username: this.state.username.toLowerCase().trim()
      });

      if (res.data.email) {
        this.setState({
          exist: (
            <h3 style={{ color: "red" }}>
              Email already exists in our database, try to log in.
            </h3>
          )
        });
      }

      if (res.data.username) {
        this.setState({
          exist: (
            <h3 style={{ color: "red" }}>
              Username already exists, try another one.
            </h3>
          )
        });
      }

      if (!res.data.email && !res.data.username) {
        const res = await axios.post("/api/signup/new", {
          email: this.state.email.toLowerCase().trim(),
          password: this.state.password,
          username: this.state.username.toLowerCase().trim()
        });

        this.setState({
          exist: (
            <h3 style={{ color: "green" }}>
              User {this.state.username} created successfully, go and log in.
            </h3>
          ),
          username: "",
          password: "",
          email: ""
        });
      }
    };

    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    const toLogin = this.state.flag ? <Redirect to="/login" /> : "";

    return (
      <div className="signup">
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
            type="text"
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
        <button onClick={handleSubmit} className="btn blue">Submit</button>
        {this.state.exist}
      </div>
    );
  }
}

export default SignUp;
