import axios from "axios";
import { LOGIN, LOGOUT, FETCH_GAMES } from "./types";

export const login = user => dispatch => {
  localStorage.setItem("token", user.token);
  dispatch({ type: LOGIN, payload: user });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT, payload: { logged: false, user: {} } });
};

export const fetchGames = ({ token }) => async dispatch => {
  const res = await axios({
    method: "POST",
    url: "/api/games",
    headers: {
      authorization: token
    }
  });
  dispatch({ type: FETCH_GAMES, payload: res.data.games });
};
