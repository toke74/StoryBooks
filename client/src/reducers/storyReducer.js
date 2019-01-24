import { ADD_STORY, STORY_LOADING } from "../actions/types";

const initialState = {
  story: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_STORY:
      // console.log(action.payload);
      return {
        ...state,
        story: action.payload
      };

    default:
      return state;
  }
}
