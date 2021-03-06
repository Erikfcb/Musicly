import React, { Component } from "react";
import { octaves, all, twoOctaves } from "../../assets/notes/notes";
import "./GuessTheNote.css";
import axios from "axios";

class GuessTheNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSound: true,
      difficulty: 1,
      rerender: false,
      progress: "",
      tries: "",
      correct: "",
      C: "blue",
      D: "blue",
      E: "blue",
      F: "blue",
      G: "blue",
      A: "blue",
      B: "blue"
    };
  }
  render() {
    const sounds =
      this.state.difficulty == 2
        ? twoOctaves
        : this.state.difficulty == 3
        ? all
        : octaves.c3;
    const level =
      this.state.difficulty == 2
        ? "Medium"
        : this.state.difficulty == 3
        ? "Hard"
        : "Easy";

    let answer = localStorage.getItem("guessTheNote");

    const getProgress = async () => {
      const res = await axios({
        method: 'POST',
        url: "/api/progress",
        data: {
          level: level,
          game: "guessTheNote"
        },
        headers: {
          'authorization': localStorage.getItem("token")
        }
      });

      if (res.data.tries !== this.state.tries) {
        this.setState({
          progress: res.data.progress,
          tries: res.data.tries,
          correct: res.data.correct
        });
      }
    };
    getProgress();

    if (answer == null || this.state.newSound === true) {
      localStorage.setItem(
        "guessTheNote",
        Math.floor(Math.random() * sounds.length)
      );
      this.setState({ newSound: false });
    }

    const change = (name, correct) => {
      if (!correct) {
        axios({
          method: 'POST',
          url: "/api/updateProgress",
          data: {
            game: "guessTheNote",
            correct: false,
            level: level
          },
          headers: {
            'authorization': localStorage.getItem("token")
          }
        });
        this.setState({
          [name]: "red"
        });
      }

      if (correct) {
        axios({
          method: 'POST',
          url: "/api/updateProgress",
          data: {
            game: "guessTheNote",
            correct: true,
            level: level
          },
          headers: {
            'authorization': localStorage.getItem("token")
          }
        });
        this.setState({
          [name]: "green"
        });
      }
    };

    const clearColors = () => {
      this.setState({
        C: "blue",
        D: "blue",
        E: "blue",
        F: "blue",
        G: "blue",
        A: "blue",
        B: "blue"
      });
    };
    const rerender = () => {
      this.setState({ rerender: !rerender });
    };
    const playAnswer = (sound, name) => {
      const audio = new Audio(sound);
      audio.play();
      if (name === sounds[answer].name) {
        // if the user's right
        localStorage.setItem(
          "guessTheNote",
          Math.floor(Math.random() * sounds.length)
        );
        change(name, true);
        setTimeout(() => {
          clearColors();
          playQuestion(sounds[localStorage.getItem("guessTheNote")].sound);
        }, 1000);
      }
      if (name !== sounds[answer].name) {
        // if the user's wrong
        change(name, false);
        setTimeout(() => {
          rerender();
        }, 500);
      }
    };

    const playQuestion = note => {
      const audio = new Audio(note);
      audio.play();
    };

    const buttons = octaves.c3.map(note => {
      return (
        <button
          onClick={() => playAnswer(note.sound, note.name)}
          className={"btn  sound  waves-light " + this.state[note.name]}
        >
          {note.name}
        </button>
      );
    });

    const difficulty = e => {
      clearColors();
      this.setState({ difficulty: e.target.id, newSound: true });
    };

    const precentage = this.state.progress + "%";

    return (
      <div className="guessTheNote container">
        <div className="question">
          <button
            onClick={() => playQuestion(sounds[answer].sound)}
            className="btn green sound"
          >
            Play
          </button>
          <p style={{ fontSize: "1.5em" }}>Click "Play" to hear the note</p>
          <button
            onClick={() => playQuestion(sounds[0].sound)}
            className="btn teal sound"
          >
            C
          </button>
          <p style={{ color: "teal" }}>reference note</p>
          <p style={{ fontSize: "1.5em" }}>
            Progress: ({this.state.correct}/{this.state.tries}){" "}
            {Math.floor(this.state.progress)}%
          </p>
          <div className="progress">
            <div className="determinate" style={{ width: precentage }} />
          </div>
        </div>
        <div className="answers">{buttons}</div>
        <p style={{ fontSize: "1.5em" }}>
          Click the note that fits to the sound you just heard.
        </p>
        <p style={{ color: "teal", fontSize: "1.5em" }}>Level: {level}</p>
        <div className="difficulties">
          <button className="btn  waves-light" id="1" onClick={difficulty}>
            Easy
          </button>
          <button className="btn  waves-light" id="2" onClick={difficulty}>
            Medium
          </button>
          <button className="btn  waves-light" id="3" onClick={difficulty}>
            Hard
          </button>
        </div>
      </div>
    );
  }
}

export default GuessTheNote;
