import * as TYPES from '../actions/actionTypes';
const userReducerInitialState = {
  user: null,
};

const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_USER_PROFILE_SUCCESS:
      return {
        user: { ...action.user },
      };
    default:
      return state;
  }
};
export default userReducer;
