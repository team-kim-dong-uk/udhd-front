import { all } from 'redux-saga/effects';
import { authSaga } from '../redux/auth';
import { photoSaga } from '../redux/photo';
import { photosSaga } from '../redux/photos';
import { uploadSaga } from '../redux/upload';
export default function* rootSaga() {
  yield all([
    photoSaga(),
    photosSaga(),
    authSaga(),
    uploadSaga(),
  ]);
}
