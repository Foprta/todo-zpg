import axios from "axios";
import { NextRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import ACTIONS from ".";
import { addAuthHeader, removeAuthHeader } from "../../../utils/axios";
import { getCurrentUser } from "./user";

export const createUser = (
  email: string,
  password: string,
  router: NextRouter
) => (dispatch) => {
  dispatch({ type: ACTIONS.CREATE_USER });

  return axios
    .post("/v1/users/create", { email, password })
    .then(({ data }) => {
      setToken(data);
      dispatch(getCurrentUser());
      dispatch({ type: ACTIONS.CREATE_USER_SUCCESS });
      router.push("/");
    })
    .catch((errors) => {
      dispatch({ type: ACTIONS.CREATE_USER_ERROR, errors });
    });
};

export const logIn = (email: string, password: string, router: NextRouter) => (
  dispatch
) => {
  dispatch({ type: ACTIONS.LOGIN_USER });

  return axios
    .post("/v1/users/login", { email, password })
    .then(({ data }) => {
      setToken(data);
      dispatch(getCurrentUser());
      dispatch({ type: ACTIONS.LOGIN_USER_SUCCESS });
      router.push("/");
    })
    .catch((errors) => {
      dispatch({ type: ACTIONS.LOGIN_USER_ERROR, errors });
    });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: ACTIONS.LOGOUT_USER });
  deleteToken();
};

function setToken(token) {
  setCookie(null, "token", token, {
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
    domain: ".todo-zpg.com",
  });
  addAuthHeader(token);
}

function deleteToken() {
  destroyCookie(null, "token");
  removeAuthHeader();
}
