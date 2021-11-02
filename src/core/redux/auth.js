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
const UPDATE_USER = asyncActionCreator(`${prefix}UPDATE_USER`);
const GET_USER = asyncActionCreator(`${prefix}GET_USER`);

export const loginSuccess = createAction(LOGIN_SUCCESS,
  ({userId, accessToken, refreshToken, nickname, isNewUser, email}) => ({userId, accessToken, refreshToken, nickname, isNewUser, email}));
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const setNickname = createAsyncAction(SET_NICKNAME);
export const updateUser = createAsyncAction(UPDATE_USER, ({userId, nickname, group}) => ({userId, nickname, group}));
export const getUser = createAsyncAction(GET_USER, ({userId}) => ({userId}));



const setNicknameSaga = createAsyncSaga(setNickname, authAPI.setNickname);
const updateUserSaga = createAsyncSaga(updateUser, authAPI.updateUser);
const getUserSaga = createAsyncSaga(getUser, authAPI.getUser);

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
            nickname: action.payload.nickname ? action.payload.nickname : state.data?.nickname,
            email: action.payload.email ? action.payload.email : state.data?.email,
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
      [UPDATE_USER.SUCCESS]: (state, action) => {
          return {
              ...state,
              data: action.payload.data,
              error: null
          }
      },[UPDATE_USER.FAILURE]: (state, action) => {
          return {
              ...state,
              error: "에러가 발생했습니다."
          };
      },
      [GET_USER.SUCCESS]: (state, action) => {
        console.log("USER DATA : "+JSON.stringify(action.payload, null, 2))
          return {
              ...state,
              data: {
                  ...state.data,
                  nickname: action.payload.data.nickname,
                  email: action.payload.data.email,
                  numLikePhotos: action.payload.data.numLikePhotos,
                  numSavePhotos: action.payload.data.numSavePhotos,
              },
              error: null
          }
      },[GET_USER.FAILURE]: (state, action) => {
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
  } else if (Router.pathname.startsWith("/login-redirect")) {
      //
    yield Router.push('/feed');
  }
}
function* redirectAfterLogoutSaga() {
    yield Router.push('/feed');
}

function* redirectAfterNicknameSetting({nickname}) {
  yield Router.push('/feed');
}
function* redirectAfterUpdateUser({nickname}) {
    yield Router.push('/mypage');
}
export function* authSaga() {
  yield takeEvery(LOGIN_SUCCESS, redirectAfterLoginSaga);
  yield takeEvery(LOGOUT, redirectAfterLogoutSaga);
  yield takeEvery(SET_NICKNAME.REQUEST, setNicknameSaga);
  yield takeEvery(SET_NICKNAME.SUCCESS, redirectAfterNicknameSetting);
  yield takeEvery(UPDATE_USER.REQUEST, updateUserSaga);
  yield takeEvery(UPDATE_USER.SUCCESS, redirectAfterUpdateUser);
  yield takeEvery(GET_USER.REQUEST, getUserSaga);

}
