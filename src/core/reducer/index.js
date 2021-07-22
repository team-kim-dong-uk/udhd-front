import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import upload from '../redux/upload';

const rootReducer = combineReducers({auth, photo, photos, upload});
export default rootReducer;
