import axios from '../axios';

const getBlogById = (id) => {
  return axios
    .get(`/blogs/${id}`)
    .then((res) => res.data.blog)
    .catch((err) => {
      throw err.response.data;
    });
};
const addBlog = (data) => {
  debugger;
  return axios.post('/blogs', data).catch((err) => {
    throw err.response.data;
  });
};

const deleteBlog = (id) => {
  return axios
    .delete(`/blogs/${id}`)
    .then((res) => res.data.message)
    .catch((err) => {
      throw err.response.data;
    });
};

const updateBlog = (id, data) => {
  return axios.patch(`/blogs/${id}`, data).catch((err) => {
    throw err.response.data;
  });
};

export { getBlogById, addBlog, deleteBlog, updateBlog };
