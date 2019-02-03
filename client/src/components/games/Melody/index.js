import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { octaves, randomMelody } from "../../assets/notes/notes";
import "./Melody.css";

class Melody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: (
        <div style={{ fontSize: "1.5em", marginTop: "20px", opacity: "0" }}>
          empty
        </div>
      ),
      progress: 0,
      correct: 0,
      tries: 0,
      melody: [],
      solution: "",
      answer: "",
      difficulty: "1",
      C: "blue",
      D: "blue",
      E: "blue",
      F: "blue",
      G: "blue",
      A: "blue",
      B: "blue"
    };
    this.getProgress = this.getProgress.bind(this);
    this.playSound = this.playSound.bind(this);
    this.difficulty = this.difficulty.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.playQuestion = this.playQuestion.bind(this);
    this.setMelody = this.setMelody.bind(this);
    this.reset = this.reset.bind(this);
    this.checkCorrect = this.checkCorrect.bind(this);
  }

  componentDidMount() {
    if (
      localStorage.getItem("token") !== null &&
      !("melody" in this.props.games)
    ) {
      this.props.fetchGames({ token: localStorage.getItem("token") });
    }
    this.setMelody(this.state.difficulty);
  }

  getProgress(lvl) {
    const level = lvl.toLowerCase();
    if ("melody" in this.props.games) {
      if (this.props.games.melody[level].tries !== this.state.tries) {
        this.setState({
          progress:
            (this.props.games.melody[level].correct * 100) /
            this.props.games.melody[level].tries,
          tries: this.props.games.melody[level].tries,
          correct: this.props.games.melody[level].correct
        });
      }
    }
  }

  clearColors() {
    this.setState({
      C: "blue",
      D: "blue",
      E: "blue",
      F: "blue",
      G: "blue",
      A: "blue",
      B: "blue"
    });
  }

  difficulty(e) {
    this.clearColors();
    this.setState({
      difficulty: e.target.id
    });
    this.setMelody(e.target.id);
  }

  setMelody(diff) {
    const sounds = randomMelody();
    const melody =
      diff == 2 ? sounds.medium : diff == 3 ? sounds.hard : sounds.easy;

    const solution = melody.reduce((acc, note) => {
      acc = acc + note.name;
      return acc;
    }, "");

    this.setState({
      solution,
      melody
    });
  }

  playQuestion() {
    let time = 0;
    this.state.melody.forEach(note => {
      const audio = new Audio(note.sound);
      setTimeout(() => {
        audio.play();
      }, time);
      time += 1000;
    });
  }

  playSound(note) {
    const audio = new Audio(note.sound);
    audio.play();
    this.setState({
      answer: this.state.answer + note.name,
      [note.name]: "blue lighten-3",
      feedback: (
        <div style={{ fontSize: "1.5em", marginTop: "20px", opacity: "0" }}>
          empty
        </div>
      )
    });
  }

  checkCorrect(level) {
    if (
      this.state.answer.length == this.state.solution.length &&
      this.state.answer != this.state.solution
    ) {
      setTimeout(() => {
        this.props.fetchGames({ token: localStorage.getItem("token") });
      }, 500);
      axios({
        method: 'POST',
        url: "/api/updateProgress",
        data: {
          game: "melody",
          correct: false,
          level: level
        },
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });

      this.reset();
      this.setState({
        feedback: (
          <div className="feedback" style={{ color: "red", fontSize: "1.5em" }}>
            Try again...
          </div>
        )
      });
    }

    if (this.state.answer == this.state.solution && this.state.answer !== "") {
      setTimeout(() => {
        this.props.fetchGames({ token: localStorage.getItem("token") });
      }, 500);
      axios({
        method: 'POST',
        url: "/api/updateProgress",
        data: {
          game: "melody",
          correct: true,
          level: level
        },
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });

      this.setMelody(this.state.difficulty);
      this.reset();
      setTimeout(() => {
        this.playQuestion();
      }, 1000);
      this.setState({
        feedback: (
          <div
            className="feedback"
            style={{ color: "green", fontSize: "1.5em" }}
          >
            Well done!
          </div>
        )
      });
    }
  }
  reset() {
    this.setState({
      answer: ""
    });
    this.clearColors();
  }

  render() {
    const precentage = isNaN(this.state.progress)? "0%": this.state.progress + '%';

    const level =
      this.state.difficulty == 2
        ? "Medium"
        : this.state.difficulty == 3
        ? "Hard"
        : "Easy";

    const buttons = octaves.c3.map(note => {
      return (
        <button
          className={"btn sound " + this.state[note.name]}
          onClick={() => this.playSound(note)}
        >
          {note.name}
        </button>
      );
    });

    this.getProgress(level);
    this.checkCorrect(level);
    return (
      <div className="melody container">
        <div className="question">
          <button onClick={this.playQuestion} className="btn green sound">
            Play
          </button>
          <p style={{ fontSize: "1.5em" }}>Click "Play" to hear the note</p>
          <p style={{ fontSize: "1.5em" }}>
            Progress: ({this.state.correct}/{this.state.tries}){" "}
            {Math.floor(this.state.progress)}%
          </p>
          <div class="progress">
            <div class="determinate" style={{ width: precentage }} />
          </div>
        </div>
        <button className="btn red resetAnswer" onClick={this.reset}>
          Reset your answer
        </button>

        {this.state.feedback}

        <div className="answers">{buttons}</div>

        <p style={{ color: "teal", fontSize: "1.5em" }}>Level: {level}</p>

        <div className="difficulties">
          <button className="btn  waves-light" id="1" onClick={this.difficulty}>
            Easy
          </button>
          <button className="btn  waves-light" id="2" onClick={this.difficulty}>
            Medium
          </button>
          <button className="btn  waves-light" id="3" onClick={this.difficulty}>
            Hard
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, games }) {
  // to be able to use this.props.game
  return { auth, games };
}

export default connect(
  mapStateToProps,
  actions
)(Melody);
