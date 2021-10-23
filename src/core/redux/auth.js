import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import Router from 'next/router';
import api from '../../api/client';

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;
const LOGOUT = `${prefix}LOGOUT`;

export const loginSuccess = createAction(LOGIN_SUCCESS, 
  ({userId, accessToken, refreshToken, nickname}) => ({userId, accessToken, refreshToken, nickname}));
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);

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
            nickname: action.payload.nickname,
          }
        };
    },
    [LOGIN_FAILURE]: (state, action) =>
      state,
    [LOGOUT]: (state, action) => {
      typeof window !== 'undefined' && window.localStorage.removeItem('refreshToken');
      api.defaults.headers.common['Authorization'] = ``;
      return {
        ...state,
        data: null,
      }
    }
  },
  initialState,
);

function* redirectAfterLoginSaga() {
  yield Router.push('/feed');
}

export function* authSaga() {
  yield takeEvery(LOGIN_SUCCESS, redirectAfterLoginSaga);
}