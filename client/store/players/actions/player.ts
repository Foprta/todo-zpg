import ACTIONS from ".";
import securedAxios from "../../../utils/axios";

export const getWeapons = () => (dispatch) => {
  dispatch({ type: ACTIONS.GET_WEAPONS });

  return securedAxios
    .get("/v1/players/weapons")
    .then(({ data }) => {
      dispatch({ type: ACTIONS.GET_WEAPONS_SUCCESS, weapons: data });
    })
    .catch((errors) => {
      dispatch({ type: ACTIONS.GET_WEAPONS_ERROR, errors });
    });
};
