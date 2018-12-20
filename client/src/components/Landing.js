import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/typing.css";
import Typist from "react-typist";

class Landing extends Component {
  render() {
    const type = this.props.auth.logged ? (
      ""
    ) : (
      <Typist className="typist">
        <Typist.Delay ms={2500} />
        Hey there!
        <Typist.Delay ms={1000} />
        <br />
        This site is going to help you improve your musical hearing.
        <Typist.Delay ms={1000} />
        <br />
        Sign up for free and become the next Mozart
        <Typist.Backspace count={6} delay={1000} />
        Bach
        <Typist.Backspace count={4} delay={600} />
        Beethoven
        <Typist.Backspace count={26} delay={1500} /> lets just begin...<Typist.Delay ms={500} />
        <Link to="/signup">Click me :)</Link>
      </Typist>
    );
    const style = { textAlign: "center", fontSize: "5em", marginTop: "50px" };
    return (
      <div className="landing">
        <div style={style}>Welcom to Musicly</div>
        {type}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  // to be able to use this.props.auth
  return { auth };
}

export default connect(mapStateToProps)(Landing);
