import { SET_USER } from "../constants/authTypes";

const initState = {
  user: {
    role: "admin",
  },
};

const authReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: { ...state.user, ...payload } };
    default:
      return state;
  }
};

export default authReducer;
