import actions from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.READ:
      return { ...state, text: action.text };

    default:
      return state;
  }
};
