import { IWeapon } from "../../../components/game/weapons/Weapon";
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
    case ACTIONS.SELECT_WEAPON:
      return { ...state, loading: true };

    case ACTIONS.GET_WEAPONS_SUCCESS:
      return { ...state, loading: false, weapons: action.weapons };

    case ACTIONS.SELECT_WEAPON_SUCCESS:
      return {
        ...state,
        loading: false,
        weapons: changeActiveWeapon(state.weapons, action.id),
      };

    case ACTIONS.SELECT_WEAPON_ERROR:
    case ACTIONS.GET_WEAPONS_ERROR:
      return { ...state, loading: false, errors: action.errors };

    default:
      return state;
  }
};

function changeActiveWeapon(weapons: IWeapon[], selectedWeaponID: number) {
  return weapons.map((weapon) => {
    weapon.ID === selectedWeaponID
      ? (weapon.IsActive = true)
      : (weapon.IsActive = false);

    return weapon;
  });
}
