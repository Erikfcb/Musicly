import axios from "axios";
import { LOGIN, LOGOUT, FETCH_GAMES } from "./types";

export const login = () => async (dispatch, user) => {
  const res = await axios.post("/api/login", { user });
  dispatch({ type: LOGIN, payload: res.data.user });
};

export const loginById = () => async (dispatch, id) => {
  const res = await axios.post("/api/login/id", { id });
  localStorage.setItem("token", res.data.user._id);
  dispatch({ type: LOGIN, payload: res.data.user });
};

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT, payload: { logged: false, user: {} } });
};

export const fetchGames = (token) => async (dispatch ) => {
  const res = await axios.post("/api/games", { id: token.id });
  dispatch({ type: FETCH_GAMES, payload: res.data.games });
};