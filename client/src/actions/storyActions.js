import axios from "axios";
import { ADD_STORY, GET_ERRORS, STORY_LOADING } from "./types";

// Logged in users stories
export const getStory = () => dispatch => {
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
export const addStory = (storyData, history) => dispatch => {
  axios
    .post("/api/add", storyData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// add story
export const editStory = (id, storyData, history) => dispatch => {
  axios
    .put(`/api/edit/${id}`, storyData)
    .then(res => {
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
export const deleteStory = (id, history) => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/delete/${id}`)
      .then(res => {
        history.push("/");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
