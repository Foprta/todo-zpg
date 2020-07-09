import { ITodo } from "../../../components/game/tasks/Todo";
import actions from "../actions";

interface IState {
  todos: ITodo[];
  loading: boolean;
  errors: any;
}

const initialState: IState = {
  todos: [],
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_TODOS:
      return { ...state, loading: true };

    case actions.GET_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.todos };

    case actions.GET_TODOS_ERROR:
      return { ...state, loading: false, errors: action.errors };

    case actions.ADD_TODOS:
      return {
        ...state,
        loading: true,
      };

    case actions.ADD_TODOS_SUCCESS:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case actions.ADD_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };

    case actions.DELETE_TODOS:
      return {
        ...state,
        loading: true,
      };

    case actions.DELETE_TODOS_SUCCESS:
      return {
        ...state,
        errors: null,
        loading: false,
        todos: state.todos.filter((todo) => todo.ID != action.payload),
      };

    case actions.DELETE_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };

    default:
      return state;
  }
};
