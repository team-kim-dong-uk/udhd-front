import { combineReducers } from 'redux';
import auth from '../redux/auth';
import photo from '../redux/photo';

const rootReducer = combineReducers({auth, photo});
export default rootReducer;
