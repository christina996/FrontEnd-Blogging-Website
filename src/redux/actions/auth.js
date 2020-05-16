import * as TYPES from './actionTypes';
import axios from '../../axios';

const auth = (data, isSignup) => (dispatch) => {
  let url = '/users/register';
  if (!isSignup) {
    url = '/users/login';
  }
  return axios
    .post(url, data)
    .then((response) => {
      dispatch({
        type: TYPES.AUTH_SUCCESS,
        token: response.data.token,
        userId: response.data.user._id,
        user: response.data.user,
      });
      return response;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export { auth };
