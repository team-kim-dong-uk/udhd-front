import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import Router from 'next/router';
import api from '../../api/client';
import * as authAPI from '../../api/auth';
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '../../util/redux';

const prefix = 'auth/';

const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;
const LOGOUT = `${prefix}LOGOUT`;
const SET_NICKNAME = asyncActionCreator(`${prefix}SET_NICKNAME`);

export const loginSuccess = createAction(LOGIN_SUCCESS, 
  ({userId, accessToken, refreshToken, nickname, isNewUser, email}) => ({userId, accessToken, refreshToken, nickname, isNewUser, email}));
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const setNickname = createAsyncAction(SET_NICKNAME);

const setNicknameSaga = createAsyncSaga(setNickname, authAPI.setNickname);

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
            email: action.payload.email,
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
    },
    [SET_NICKNAME.SUCCESS]: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          nickname: action.payload.data.nickname,
        },
        error: null
      }
    },[SET_NICKNAME.FAILURE]: (state, action) => {
      if (action.payload.status === 409) {
        return {
          ...state,
          error: "중복된 닉네임이 이미 존재합니다."
        }
      }
      return {
        ...state,
        error: "에러가 발생했습니다."
      };
    },
  },
  initialState,
);

function* redirectAfterLoginSaga({payload: {isNewUser}}) {
  if (isNewUser === 'true') {
    yield Router.push('/login/nickname');
  } else {
    yield Router.push('/feed');
  }
}

function* redirectAfterNicknameSetting({nickname}) {
  yield Router.push('/feed');
}

export function* authSaga() {
  yield takeEvery(LOGIN_SUCCESS, redirectAfterLoginSaga);
  yield takeEvery(SET_NICKNAME.REQUEST, setNicknameSaga);
  yield takeEvery(SET_NICKNAME.SUCCESS, redirectAfterNicknameSetting);
}