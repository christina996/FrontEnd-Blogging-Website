import * as TYPES from '../actions/actionTypes';
const blogsReducerInitialState = {
  blogs: [],
  NumOfPages: 1,
  limit: 4,
};

const blogsReducer = (state = blogsReducerInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_BLOGS_SUCCESS:
      console.log(action.blogs);
      return {
        ...state,
        blogs: [...action.blogs],
        NumOfPages: action.NumOfPages,
      };
    default:
      return state;
  }
};
export default blogsReducer;
