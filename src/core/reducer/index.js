import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';

const rootReducer = combineReducers({auth, photo, photos});
export default rootReducer;
