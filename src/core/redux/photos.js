import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as photoAPI from '../../api/photo';

const prefix = 'photos/';

// 2. 액션타입에 대해서 정의합니다.
const GET_RANDOM_PHOTOS = asyncActionCreator(`${prefix}GET_RANDOM_PHOTOS`);

// 3. 액션함수에 대해서 정의합니다.
//photoId: optional
export const getRandomPhotos = createAsyncAction(GET_RANDOM_PHOTOS);

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getRandomPhotosSaga = createAsyncSaga(getRandomPhotos, photoAPI.getRandomPhotos);

// 5. 초기 상태 정의
const initialState = {
  data: [],
  isEnd: false,
  loading: false,
  error: null,
};

// 6. 리듀서 정의
export default handleActions(
  {
      [GET_RANDOM_PHOTOS.SUCCESS]: (state, action) => {
          if (state.data.length === 0){
              return {
                  ...state,
                  data: action.payload.data,
                  error: null,
              };
          } else {
              return {
                  ...state,
                  data: state.data.concat(action.payload.data),
                  error: null,
              };
          }
      },
      [GET_RANDOM_PHOTOS.FAILURE]: (state, action) => {
        return {
            ...state,
            error: action.payload.error,
        };
      },

  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* photosSaga() {
    yield takeEvery(GET_RANDOM_PHOTOS.REQUEST, getRandomPhotosSaga);
}
