import * as TYPES from '../actions/actionTypes';

const apiCallsInProgress = 0;

function actionTypeEndsInSuccess(type) {
  if (type.substring(type.length - 8) === '_SUCCESS') return type;
}

const statusReducer = (state = apiCallsInProgress, action) => {
  switch (action.type) {
    case TYPES.BEGIN_API_CALL:
      return state + 1;
    case actionTypeEndsInSuccess(action.type):
    case TYPES.API_CALL_ERROR:
      return state - 1;
    default:
      return state;
  }
};
export default statusReducer;
