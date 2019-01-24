import axios from "axios";
import { ADD_STORY, GET_ERRORS, STORY_LOADING } from "./types";

// Logged in users stories
export const getStory = () => dispatch => {
  // dispatch(setStoryLoading());
  axios
    .get("/api/my")
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Pubic stories
export const getPublicStories = () => dispatch => {
  axios
    .get("/api/public/show")
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get single story
export const getSingleStory = id => dispatch => {
  // dispatch(setStoryLoading());
  axios
    .get(`/api/show/${id}`)
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// get public stories
export const getUserPublicStories = id => dispatch => {
  // dispatch(setStoryLoading());
  axios
    .get(`/api/user/stories/${id}`)
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// get my stories
export const getMyStories = id => dispatch => {
  // dispatch(setStoryLoading());
  axios
    .get(`/api/my/stories/${id}`)
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add story
export const addStory = (userData, history) => dispatch => {
  axios
    .post("/api/add", userData)
    .then(res => {
      console.log(res);
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Story loading
export const setStoryLoading = () => {
  return {
    type: STORY_LOADING
  };
};

// Delete story
export const deleteStory = id => dispatch => {
  axios
    .delete(`/api/delete/${id}`)
    .then(res => {
      console.log(res.data);
      // dispatch({
      //   type: GET_STORY,
      //   payload: res.data
      // });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
