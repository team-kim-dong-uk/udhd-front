import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asynActionCreator,
  createAsyncAction,
} from '../../util/redux';
import { getCurrentUserApi, loginApi } from '../api/saga/auth';

const dummyMyInfo = {
  name: 'lmu',
  age: 24,
};

const prefix = 'auth/';

const LOG_IN = asyncActionCreator(`${prefix}LOG_IN`);
const GET_CURRENT_USER = asyncActionCreator(`${prefix}GET_CURRENT_USER`);

const LOG_OUT = `${prefix}LOG_OUT`;
const UNLOAD_USER = `${prefix}UNLOAD_USER`;

export const login = createAsyncAction(LOG_IN);
export const getCurrentUser = createAsyncAction(GET_CURRENT_USER);

const loginSaga = createAsyncSaga(login, loginApi);
const getCurrentUserSaga = createAsyncSaga(getCurrentUser, getCurrentUserApi);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default handleActions({
  [LOG_IN.SUCCESS]: (state, action) => produce(state, (draft) => {
    draft.data = action.payload;
    draft.loading = false;
  }),
  [LOG_IN.FAILURE]: (state, action) => produce(state, (draft) => {
    draft.error = null;
    draft.loading = false;
  }),
  [LOG_OUT]: (state, action) => produce(state, (draft) => {
    draft.data = null;
    draft.loading = false;
  }),
  [GET_CURRENT_USER.SUCCESS]: (state, action) => produce(state, (draft) => {
    draft.data = null;
    draft.loading = false;
  }),
  [GET_CURRENT_USER.FAILURE]: (state, action) => produce(state, (draft) => {
    draft.error = null;
    draft.loading = false;
    draft.data = dummyMyInfo;
  }),
  [UNLOAD_USER]: () => initialState,
}, initialState);

export function* authSaga() {
  yield takeEvery(LOG_IN.REQUEST, loginSaga);
  yield takeEvery(GET_CURRENT_USER.REQUEST, getCurrentUserSaga);
}
