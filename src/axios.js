import axios from 'axios';
import store from './redux/store';
import { onFailure, startLoading } from './redux/actions/statusActions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
// Axios Interceptors
// Request
instance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const { token } = store.getState().auth;
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    store.dispatch(onFailure());
    return Promise.reject(error);
  }
);

// Response
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    store.dispatch(onFailure());
    return Promise.reject(error);
  }
);

export default instance;
