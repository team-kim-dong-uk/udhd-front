import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import api from '../../api/client';

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;
const SET_TOKEN = `${prefix}SET_TOKEN`;

export const loginSuccess = createAction(LOGIN_SUCCESS, ({userId, accessToken, refreshToken}) => ({userId, accessToken, refreshToken}));
export const loginFailure = createAction(LOGIN_FAILURE);
export const setToken = createAction(SET_TOKEN, ({accessToken, refreshToken}) => ({accessToken, refreshToken}));

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => {
        typeof window !== 'undefined' && window.localStorage.setItem('refreshToken', action.payload.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.accessToken}`;
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
    [SET_TOKEN]: (state, action) => {
      typeof window !== 'undefined' && window.localStorage.setItem('refreshToken', action.payload.refreshToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.accessToken}`;
      return {
        ...state,
        data: {
          accessToken: action.payload.accessToken,
        }
      };
  }
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photoSaga() {
  yield takeEvery(GET_PHOTO.REQUEST, getPhotoSaga);
}