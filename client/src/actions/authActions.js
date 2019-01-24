import axios from "axios";
import { GET_CURRENT_USER } from "./types";

// // Login - Get User Token
export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/current_user")
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
