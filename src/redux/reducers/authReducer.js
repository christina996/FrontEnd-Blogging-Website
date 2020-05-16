import * as TYPES from '../actions/actionTypes';

const authReducerInitialState = {
  token: null,
  userId: null,
  user: null,
};

const authReducer = (state = authReducerInitialState, action) => {
  switch (action.type) {
    case TYPES.AUTH_SUCCESS:
      return {
        token: action.token,
        userId: action.userId,
        user: { ...action.user },
      };
    case TYPES.FOLLOW_USER_SUCCESS:
      debugger;
      const isFollowing = state.user.following.some(
        (user) => user === action.id
      );
      const following = isFollowing
        ? state.user.following.filter((user) => user !== action.id)
        : [...state.user.following, action.id];
      return {
        ...state,
        user: {
          ...state.user,
          following,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
