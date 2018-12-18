import React, { Component } from "react";
import { octaves, all } from "../assets/notes/notes";
import axios from 'axios';

class Melody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "1"
    };
    this.getProgress = this.getProgress.bind(this);
  }
  async getProgress(level) {
    const res = await axios.post("/api/progress", {
      level: level,
      id: localStorage.getItem("token"),
      game: "intervals"
    });

    if (res.data.tries !== this.state.tries) {
      this.setState({
        progress: res.data.progress,
        tries: res.data.tries,
        correct: res.data.correct
      });
    }
  }
  render() {
    const level =
      this.state.difficulty == 2
        ? "Medium"
        : this.state.difficulty == 3
        ? "Hard"
        : "Easy";
    this.getProgress(level);

    return <div className="melody">This is the Melody game!</div>;
  }
}

export default Melody;
