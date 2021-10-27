import { combineReducers } from 'redux';
import auth from '../redux/auth';
import feed from '../redux/feed';
import loading from '../redux/loading';
import photos from '../redux/photos';

const rootReducer = combineReducers({auth, feed, loading, photos});
export default rootReducer;
