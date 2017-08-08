import { combineReducers } from 'redux'
import home from './home/reducer';
import posts from './posts/reducer';

export default combineReducers({
  home,
  posts
});
