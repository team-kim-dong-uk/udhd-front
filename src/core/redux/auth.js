import axios from 'axios';
import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';

const getPhotoApi = () => {
  console.log('api call')
  return axios.get('http://udhd.djbaek.com:8080/api/v1/photos/456');
};

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;

export const loginSuccess = createAction(LOGIN_SUCCESS, ({userId, accessToken, refreshToken}) => ({userId, accessToken, refreshToken}));
export const loginFailure = createAction(LOGIN_FAILURE);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => {
        console.log(action);
        typeof window !== 'undefined' && window.localStorage.setItem('refreshToken', action.payload.refreshToken);
        return {
          ...state,
          data: {
            userId: action.payload.userId,
            accessToken: action.payload.accessToken,
          }
        };
    },
    [LOGIN_FAILURE]: (state, action) =>
      state,
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photoSaga() {
  yield takeEvery(GET_PHOTO.REQUEST, getPhotoSaga);
}