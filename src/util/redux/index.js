import { createAction } from 'redux-actions';
import { call, put} from 'redux-saga/effects';
import * as authAPI from '../../api/auth';
import api from '../../api/client';
import { setToken } from '../../core/redux/auth';

export const asyncActionCreator = (actionName) => {
  const asyncTypeAction = ['_REQUEST', '_SUCCESS', '_FAILURE'];
  return {
    REQUEST: actionName + asyncTypeAction[0],
    SUCCESS: actionName + asyncTypeAction[1],
    FAILURE: actionName + asyncTypeAction[2],
  };
};

export const createAsyncAction = (asyncAction) => {
  return {
    request: createAction(asyncAction.REQUEST),
    success: createAction(asyncAction.SUCCESS),
    failure: createAction(asyncAction.FAILURE),
  };
};

export default function createAsyncSaga(asyncAction, asyncFunction) {
  return function* saga(action) {
    try {
      const result = yield call(asyncFunction, action?.payload);
      yield put(asyncAction.success(result));
    } catch (error) {
      if (error?.response?.status === 401) {
        try {
          // acessToken이 잘못되어 401응답을 받은경우, refreshToken으로 새 토큰을 요청한다.
          const tokenResponse = yield authAPI.refreshToken();
          yield put(setToken(tokenResponse.data));
          // 새 토큰 정보를 가지고 다시 요청을 보낸다.
          const result = yield call(asyncFunction, action?.payload);
          yield put(asyncAction.success(result));
        } catch (e) {
          yield put(asyncAction.failure({ error: e }));
        }
      } else {
        yield put(asyncAction.failure({ error }));
      }
    }
  }
}
