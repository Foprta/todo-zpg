import { Dispatch } from "redux";
import actions from ".";
import securedAxios from "../../../utils/axios";

export const getTodos = () => (dispatch: Dispatch) => {
  dispatch({ type: actions.GET_TODOS });

  securedAxios
    .get("/v1/todos/list")
    .then(({ data }) =>
      dispatch({ type: actions.GET_TODOS_SUCCESS, todos: data })
    )
    .catch((errors) => dispatch({ type: actions.GET_TODOS_ERROR, errors }));
};

export const changeTodoState = (id: string, isDone: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actions.CHANGE_TODO_STATE });

  securedAxios
    .post("/v1/todos", { id, isDone })
    .then(() => dispatch({ type: actions.CHANGE_TODO_STATE_SUCCESS }))
    .catch((errors) =>
      dispatch({ type: actions.CHANGE_TODO_STATE_ERROR, errors })
    );
};

export const deleteTodo = (id: string) => (dispatch: Dispatch) => {
  dispatch({ type: actions.DELETE_TODOS });

  securedAxios
    .delete(`/v1/todos/${id}`)
    .then(() => dispatch({ type: actions.DELETE_TODOS_SUCCESS, payload: id }))
    .catch((errors) => dispatch({ type: actions.DELETE_TODOS_ERROR, errors }));
};

export const createTodo = (text: string) => (dispatch) => {
  dispatch({ type: actions.ADD_TODOS });

  securedAxios
    .post("/v1/todos/create", { text })
    .then(() => {
      dispatch({ type: actions.ADD_TODOS_SUCCESS });
      dispatch(getTodos());
    })
    .catch((errors) => dispatch({ type: actions.ADD_TODOS_ERROR, errors }));
};
