import ACTIONS from "../actions";

export interface IUser {
  email: string;
}

interface IState {
  user: IUser;
  loading: boolean;
  errors: any;
}

const initialState: IState = {
  user: null,
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_CURRENT_USER:
      return { ...state, loading: true };

    case ACTIONS.GET_CURRENT_USER_SUCCESS:
      return { ...initialState, user: action.user };

    case ACTIONS.GET_CURRENT_USER_ERROR:
      return { user: null, errors: action.errors, loading: false };

    default:
      return state;
  }
};
