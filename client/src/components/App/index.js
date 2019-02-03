import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import Landing from "../Landing";
import Header from "../Header";
import Login from "../Login";
import SignUp from "../SignUp";
import GuessTheNote from "../games/GuessTheNote";
import Intervals from "../games/Intervals";
import Melody from "../games/Melody";
import Howto from "../Howto";
import Contact from "../Contact";

import * as actions from "../../actions";
import { logout } from "../../LocalStorage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/games" component={Dashboard} />
          <Route path="/guessthenote" component={GuessTheNote} />
          <Route path="/intervals" component={Intervals} />
          <Route path="/melody" component={Melody} />
          <Route path="/howto" component={Howto} />
          <Route path="/contact" component={Contact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
