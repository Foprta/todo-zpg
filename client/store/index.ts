import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import tasksReducers from "./tasks/reducers";
import usersReducers from "./users/reducers";

const appReducer = combineReducers({
  users: usersReducers,
  tasks: tasksReducers,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }
  return appReducer(state, action);
};

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const makeStore = (initialState) => {
  return createStore(rootReducer, initialState, enhancer);
};
