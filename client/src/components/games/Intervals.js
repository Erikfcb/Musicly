import React, { Component } from "react";
import axios from "axios";
import { octaves, all, intervals } from "../assets/notes/notes";
import "./Intervals.css";

class Intervals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
      progress: 0,
      correct: 0,
      tries: 0,
      interval: {},
      newSound: true,
      difficulty: "1",
      second: "blue",
      third: "blue",
      fifth: "blue",
      seventh: "blue",
      octave: "blue"
    };
    this.difficulty = this.difficulty.bind(this);
    this.change = this.change.bind(this);
    this.newInterval = this.newInterval.bind(this);
    this.playQuestion = this.playQuestion.bind(this);
    this.getProgress = this.getProgress.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.clearColors = this.clearColors.bind(this);
  }

  change(name, correct) {
    const level =
      this.state.difficulty == 2
        ? "Medium"
        : this.state.difficulty == 3
        ? "Hard"
        : "Easy";
    if (!correct) {
      axios.post("/api/updateProgress", {
        game: "intervals",
        correct: false,
        id: localStorage.getItem("token"),
        level: level
      });
      setTimeout(() => {
        this.setState({ rerender: !this.state.rernder });
      }, 500);
      this.setState({ [name]: "red" });
    }

    if (correct) {
      axios.post("/api/updateProgress", {
        game: "intervals",
        correct: true,
        id: localStorage.getItem("token"),
        level: level
      });
      this.newInterval(level);
      this.setState({ [name]: "green" });
    }
  }

  clearColors() {
    this.setState({
      second: "blue",
      third: "blue",
      fifth: "blue",
      seventh: "blue",
      octave: "blue"
    });
  }

  checkAnswer(answer) {
    if (answer === this.state.interval.answer) {
      this.change(answer, true);
      setTimeout(() => {
        this.clearColors();
        this.playQuestion();
      }, 1000);
    }
    if (answer !== this.state.interval.answer) this.change(answer, false);
  }

  newInterval(diff) {
    const level = diff.toLowerCase();
    const intervalIndex = Math.floor(Math.random() * intervals[level].length);
    const answer = intervals[level][intervalIndex].answer;
    const pairIndex = Math.floor(
      Math.random() * intervals[level][intervalIndex].sounds.length
    );
    localStorage.setItem("intervalAnswer", answer);
    localStorage.setItem(
      "firstOfPair",
      intervals[level][intervalIndex].sounds[pairIndex][0]
    );
    localStorage.setItem(
      "secondOfPair",
      intervals[level][intervalIndex].sounds[pairIndex][1]
    );

    const pair = [
      localStorage.getItem("firstOfPair"),
      localStorage.getItem("secondOfPair")
    ];

    const interval = {
      answer: localStorage.getItem("intervalAnswer"),
      pair: pair
    };
    this.setState({ interval: interval });
  }

  difficulty(e) {
    this.clearColors();
    this.setState({
      difficulty: e.target.id,
      newSound: true
    });
  }

  playQuestion() {
    const first = new Audio(this.state.interval.pair[0]);
    const second = new Audio(this.state.interval.pair[1]);
    first.play();
    setTimeout(() => {
      second.play();
    }, 1000);
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
    if (
      localStorage.getItem("intervalAnswer") == null ||
      this.state.newSound === true
    ) {
      this.newInterval(level);
      this.setState({ newSound: false });
    }

    const types =
      this.state.difficulty == 3
        ? [
            { answer: "second", title: "Major 2nd" },
            { answer: "third", title: "Major 3nd" },
            { answer: "fifth", title: "Perfect 5th" },
            { answer: "seventh", title: "Major 7th" },
            { answer: "octave", title: "Octave" }
          ]
        : this.state.difficulty == 2
        ? [
            { answer: "second", title: "Major 2nd" },
            { answer: "third", title: "Major 3nd" },
            { answer: "fifth", title: "Perfect 5th" },
            { answer: "octave", title: "Octave" }
          ]
        : [
            { answer: "third", title: "Major 3nd" },
            { answer: "fifth", title: "Perfect 5th" },
            { answer: "octave", title: "Octave" }
          ];

    const buttons = types.map(type => {
      return (
        <button
          onClick={() => this.checkAnswer(type.answer)}
          className={
            "btn interval  waves-light " + this.state[type.answer]
          }
        >
          {type.title}
        </button>
      );
    });

    const precentage = this.state.progress + "%";

    return (
      <div className="intervals container">
        <div className="question">
          <button
            onClick={this.playQuestion}
            className="btn green sound  waves-light"
          >
            Play
          </button>
          <p style={{ fontSize: "1.5em" }}>Click the button to hear again</p>

          <p style={{ fontSize: "1.5em" }}>
            Progress: ({this.state.correct}/{this.state.tries}){" "}
            {Math.floor(this.state.progress)}%
          </p>
          <div class="progress">
            <div class="determinate" style={{ width: precentage }} />
          </div>
        </div>
        <div className="answers">{buttons}</div>
        <p style={{ fontSize: "1.5em" }}>Click the correct interval.</p>
        <p style={{ color: "teal", fontSize: "1.5em" }}>Level: {level}</p>
        <div className="difficulties">
          <button
            className="btn  waves-light"
            id="1"
            onClick={this.difficulty}
          >
            Easy
          </button>
          <button
            className="btn  waves-light"
            id="2"
            onClick={this.difficulty}
          >
            Medium
          </button>
          <button
            className="btn  waves-light"
            id="3"
            onClick={this.difficulty}
          >
            Hard
          </button>
        </div>
      </div>
    );
  }
}

export default Intervals;
