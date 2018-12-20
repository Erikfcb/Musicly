import { LOGIN, LOGOUT, SIGNUP } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { logged: true, user: action.user };
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
