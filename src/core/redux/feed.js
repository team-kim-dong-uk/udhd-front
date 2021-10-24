import { handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga, {
  asyncActionCreator,
  createAsyncAction,
} from '../../util/redux/index';
import * as feedAPI from '../../api/feed';
// import ToastUtil from "../../util/ToastUtil";

const prefix = 'feed/';

// 2. 액션타입에 대해서 정의합니다.
const GET_FEEDS = asyncActionCreator(`${prefix}GET_FEEDS`);

// 3. 액션함수에 대해서 정의합니다.
//photoId: optional
export const getFeeds = createAsyncAction(GET_FEEDS, ({photoId}) => ({photoId}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getFeedsSaga = createAsyncSaga(getFeeds, feedAPI.getFeeds);

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
      [GET_FEEDS.SUCCESS]: (state, action) => {
          return {
              ...state,
              data: action.payload.data.feeds,
          };
      },
      [GET_FEEDS.FAILURE]: (state, action) => {
        return {
            ...state,
            error: action.payload.error,
        };
    },
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* feedSaga() {
    yield takeEvery(GET_FEEDS.REQUEST, getFeedsSaga);
}
