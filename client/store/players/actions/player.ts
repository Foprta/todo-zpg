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

export const selectWeapon = (weaponId: number) => (dispatch) => {
  dispatch({ type: ACTIONS.SELECT_WEAPON });

  return securedAxios
    .get("/v1/players/weapons/select/" + weaponId)
    .then(({ data }) => {
      dispatch({ type: ACTIONS.SELECT_WEAPON_SUCCESS, ID: weaponId });
    })
    .catch((errors) => {
      dispatch({ type: ACTIONS.SELECT_WEAPON_ERROR, errors });
    });
};
