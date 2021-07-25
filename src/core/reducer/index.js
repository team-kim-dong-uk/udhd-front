import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import upload from '../redux/upload';
import loading from '../redux/loading';

const rootReducer = combineReducers({auth, photo, photos, upload, loading});
export default rootReducer;
