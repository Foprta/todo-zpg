import ACTIONS from "../actions";

interface IState {
  loading: boolean;
  errors: any;
}

const initialState: IState = {
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_USER:
    case ACTIONS.LOGIN_USER:
      return { ...state, loading: true };

    case ACTIONS.CREATE_USER_SUCCESS:
    case ACTIONS.LOGIN_USER_SUCCESS:
      return initialState;

    case ACTIONS.CREATE_USER_ERROR:
    case ACTIONS.LOGIN_USER_ERROR:
      return { errors: action.errors, loading: false };

    default:
      return state;
  }
};
