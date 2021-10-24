import { combineReducers } from 'redux';
import auth from '../redux/auth';
import feed from '../redux/feed';
import loading from '../redux/loading';

const rootReducer = combineReducers({auth, feed, loading});
export default rootReducer;
