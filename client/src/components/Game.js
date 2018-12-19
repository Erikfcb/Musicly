// going to show games
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../style/game.css";
import { Button, Modal } from "react-materialize";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      rerender: false
    };
  }
  render() {
    const start = () => {
      this.setState(state => ({
        redirect: <Redirect to={this.props.game.route} />
      }));
    };

    const reset = async () => {
      if (this.props.game !== undefined) {
        const title = this.props.game.resetTitle;
        await axios.post("/api/reset", {
          id: localStorage.getItem("token"),
          name: title
        });
        this.props.game.rerender();
      }
      this.setState({ rerender: !this.state.rerender });
    };

    return (
      <div className="card">
        <div className="card-image-title">
          <h1 className="card-title marginLeft">
            {this.props.game !== undefined ? this.props.game.title : ""}
          </h1>
        </div>
        <div className="card-content marginLeft">
          <p>
            {this.props.game !== undefined ? this.props.game.description : ""}
          </p>
        </div>
        <div className="card-action">
          <button className="play marginLeft btn left green" onClick={start}>
            Play
          </button>
          <p className="">
            Easy:{" "}
            {this.props.game === undefined ||
            isNaN(this.props.game.progress.easy)
              ? "0"
              : Math.floor(this.props.game.progress.easy)}
            %
          </p>
          <p className="">
            Medium:{" "}
            {this.props.game === undefined ||
            isNaN(this.props.game.progress.medium)
              ? "0"
              : Math.floor(this.props.game.progress.medium)}
            %
          </p>
          <p className="">
            Hard:{" "}
            {this.props.game === undefined ||
            isNaN(this.props.game.progress.hard)
              ? "0"
              : Math.floor(this.props.game.progress.hard)}
            %
          </p>

          <Modal
            header="Warning"
            trigger={<Button className="reset btn right red">Reset</Button>}
            actions={[
              <Button
                modal="close"
                onClick={reset}
                style={{ marginRight: "20px" }}
              >
                Yes
              </Button>,
              <Button modal="close">No</Button>
            ]}
          >
            <p>Are you sure you want to reset the progress?</p>
          </Modal>
        </div>
        {this.state.redirect}
      </div>
    );
  }
}

export default Game;
