// going to show games
import React, { Component } from "react";
import GuessTheNote from "../games/GuessTheNote";
import Game from '../Game';
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false
    };
    this.handleRender = this.handleRender.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.props.fetchGames({ token });
  }

  handleRender() {
    const token = localStorage.getItem("token");
    this.props.fetchGames({ token });
    this.setState({ rerender: !this.state.rerender });
  }

  render() {
    let games = {};

    const renderGames = () => {
      games = {
        guessTheNote: {
          rerender: this.handleRender,
          resetTitle: "guessTheNote",
          route: "/guessthenote",
          title: "Guess The Note",
          description:
            "You'll hear sound of a random note and guess which note it was.",
          progress: {
            easy:
              (this.props.games.guessTheNote.easy.correct * 100) /
              this.props.games.guessTheNote.easy.tries,
            medium:
              (this.props.games.guessTheNote.medium.correct * 100) /
              this.props.games.guessTheNote.medium.tries,
            hard:
              (this.props.games.guessTheNote.hard.correct * 100) /
              this.props.games.guessTheNote.hard.tries
          }
        },
        intervals: {
          rerender: this.handleRender,
          resetTitle: "intervals",
          route: "/intervals",
          title: "Intervals",
          description:
            "You'll hear a sequence of 2 notes and decide whether the interval between those 2 notes is major 3rd, perfect 5th or an octave.",
          progress: {
            easy:
              (this.props.games.intervals.easy.correct * 100) /
              this.props.games.intervals.easy.tries,
            medium:
              (this.props.games.intervals.medium.correct * 100) /
              this.props.games.intervals.medium.tries,
            hard:
              (this.props.games.intervals.hard.correct * 100) /
              this.props.games.intervals.hard.tries
          }
        },
        melody: {
          rerender: this.handleRender,
          resetTitle: "melody",
          route: "/melody",
          title: "Melody chain",
          description:
            "You'll hear a sequence of 2-3-4 notes from a given scale and try to repeat the notes.",
          progress: {
            easy:
              (this.props.games.melody.easy.correct * 100) /
              this.props.games.melody.easy.tries,
            medium:
              (this.props.games.melody.medium.correct * 100) /
              this.props.games.melody.medium.tries,
            hard:
              (this.props.games.melody.hard.correct * 100) /
              this.props.games.melody.hard.tries
          }
        }
      };
    };

    if (typeof this.props.games.guessTheNote !== "undefined") {
      renderGames();
    }
    return (
      <div className="dashboard container">
        <h1>Ear Training Practice</h1>
        <blockquote style={{ fontSize: "1.5em" }}>
          These exercises will improve your musical ability by developing a more
          intuitive understanding of what you hear.
        </blockquote>
        <Game game={games.guessTheNote} />
        <Game game={games.intervals} />
        <Game game={games.melody} />        
      </div>
    );
  }
}

function mapStateToProps({ games }) {
  return { games };
}

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
