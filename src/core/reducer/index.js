import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';
import photos from '../redux/photos';
import upload from '../redux/upload';
import loading from '../redux/loading';
import album from "../redux/album";

const rootReducer = combineReducers({auth, photo, photos, upload, loading, album});
export default rootReducer;
