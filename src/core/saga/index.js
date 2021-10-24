import { all } from 'redux-saga/effects';
import { authSaga } from '../redux/auth';
import { feedSaga
 } from '../redux/feed';
export default function* rootSaga() {
  yield all([
    authSaga(),
    feedSaga(),
  ]);
}
