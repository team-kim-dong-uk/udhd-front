import { all } from 'redux-saga/effects';
import { authSaga } from '../redux/auth';
import { photoSaga } from '../redux/photo';
export default function* rootSaga() {
  yield all([
    photoSaga(),
    authSaga()
  ]);
}
