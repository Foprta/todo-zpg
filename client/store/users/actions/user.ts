import { Dispatch } from "redux";
import ACTIONS from ".";
import securedAxios from "../../../utils/axios";
import { IUser } from "../reducers/user";

export const getCurrentUser = () => (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.GET_CURRENT_USER });

  return securedAxios
    .get("/v1/users")
    .then(({ data }: { data: IUser }) => {
      dispatch({ type: ACTIONS.GET_CURRENT_USER_SUCCESS, user: data });
    })
    .catch((err) => {
      dispatch({ type: ACTIONS.GET_CURRENT_USER_ERROR, err });
    });
};
