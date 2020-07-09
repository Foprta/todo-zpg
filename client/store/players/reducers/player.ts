import ACTIONS from "../actions";

interface IState {
  loading: boolean;
  errors: any;
  weapons: any[];
}

const initialState: IState = {
  loading: false,
  errors: null,
  weapons: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_WEAPONS:
      return { ...state, loading: true };
    case ACTIONS.GET_WEAPONS_SUCCESS:
      return { ...state, loading: false, weapons: action.weapons };

    case ACTIONS.GET_WEAPONS_ERROR:
      return { ...state, loading: false, errors: action.errors };

    default:
      return state;
  }
};
