import * as TYPES from './actionTypes';
import axios from '../../axios';

const getBlogs = (page, limit) => (dispatch) => {
  return axios
    .get(`/blogs?page=${page}&limit=${limit}`)
    .then((response) => {
      dispatch({
        type: TYPES.GET_BLOGS_SUCCESS,
        blogs: response.data.blogs,
        NumOfPages: response.data.NumOfPages,
      });
    })
    .catch((err) => {
      throw err.response.data;
    });
};

const searchForBlogs = (page, limit, searchTerm, value) => (dispatch) => {
  let url;
  if (searchTerm === 0)
    url = `/blogs/search?page=${page}&limit=${limit}&author=${value}`;
  else if (searchTerm === 1)
    url = `/blogs/search?page=${page}&limit=${limit}&title=${value}`;
  else if (searchTerm === 2)
    url = `/blogs/search?page=${page}&limit=${limit}&tag=${value}`;

  return axios
    .get(url)
    .then((response) => {
      dispatch({
        type: TYPES.GET_BLOGS_SUCCESS,
        blogs: response.data.blogs,
        NumOfPages: response.data.NumOfPages,
      });
    })
    .catch((err) => {
      throw err.response.data;
    });
};

const getFollowingBlogs = (page, limit) => (dispatch) => {
  return axios
    .get(`/users/following-blogs?page=${page}&limit=${limit}`)
    .then((response) => {
      debugger;
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

const getBlogsByUserId = (id, page, limit) => (dispatch) => {
  return axios
    .get(`/blogs/user/${id}?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({
        type: TYPES.GET_BLOGS_SUCCESS,
        blogs: res.data.blogs.blogs,
        NumOfPages: res.data.blogs.NumOfPages,
      });
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export { getBlogs, searchForBlogs, getFollowingBlogs, getBlogsByUserId };
