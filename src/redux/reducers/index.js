import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogsReducer from './blogReducer';
import statusReducer from './statusReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  status: statusReducer,
  user: userReducer,
});

export default rootReducer;
