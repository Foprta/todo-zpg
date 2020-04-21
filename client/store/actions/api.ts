import axios from "axios";
import { Dispatch } from "redux";

export const getText = () => (dispatch: Dispatch) =>
  axios
    .get("/api/v1/")
    .then(({ data }) => {
      return data.Name;
    })
    .then((text) => dispatch({ type: "READ", text }))
    .catch((err) => dispatch({ type: "READ", text: JSON.stringify(err) }));
