import * as TYPES from './actionTypes';
import axios from '../../axios';

const getProfileById = (id, page, limit) => (dispatch) => {
  return axios
    .get(`/users/${id}?page=${page}&limit=${limit}`)
    .then((response) => {
      dispatch({
        type: TYPES.GET_USER_PROFILE_SUCCESS,
        user: response.data.user,
      });
      dispatch({
        type: TYPES.GET_BLOGS_SUCCESS,
        blogs: response.data.blogs.blogs,
        NumOfPages: response.data.blogs.NumOfPages,
      });
    })
    .catch((err) => {
      throw err.response.data;
    });
};

const followUser = (id) => (dispatch) => {
  return axios.post(`/users/follow-user/${id}`).then((response) => {
    console.log(response.data.message);
    dispatch({
      type: TYPES.FOLLOW_USER_SUCCESS,
      id,
    });
    return response.data.message;
  });
};

export { getProfileById, followUser };
