import { SET_USER } from "../constants/authTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
