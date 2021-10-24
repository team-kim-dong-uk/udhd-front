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
const ADD_FEED_LIKE = asyncActionCreator(`${prefix}ADD_FEED_LIKE`);
const DEL_FEED_LIKE = asyncActionCreator(`${prefix}DEL_FEED_LIKE`);

const SAVE_FEED = asyncActionCreator(`${prefix}SAVE_FEED`);
const UNSAVE_FEED = asyncActionCreator(`${prefix}UNSAVE_FEED`);

// 3. 액션함수에 대해서 정의합니다.
//photoId: optional
export const getFeeds = createAsyncAction(GET_FEEDS, ({photoId}) => ({photoId}));

export const addFeedLike = createAsyncAction(ADD_FEED_LIKE, ({feedId}) => ({feedId}));
export const deleteFeedLike = createAsyncAction(DEL_FEED_LIKE, ({feedId}) => ({feedId}));

export const saveFeed = createAsyncAction(SAVE_FEED, ({feedId}) => ({feedId}));
export const unsaveFeed = createAsyncAction(UNSAVE_FEED, ({feedId}) => ({feedId}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getFeedsSaga = createAsyncSaga(getFeeds, feedAPI.getFeeds);
const addFeedLikeSaga = createAsyncSaga(addFeedLike, feedAPI.addFeedLike);
const deleteFeedLikeSaga = createAsyncSaga(deleteFeedLike, feedAPI.deleteFeedLike);
const saveFeedSaga = createAsyncSaga(saveFeed, feedAPI.saveFeed);
const unsaveFeedSaga = createAsyncSaga(unsaveFeed, feedAPI.unsaveFeed);

// 5. 초기 상태 정의
const initialState = {
  data: [],
  isEnd: false,
  loading: false,
  error: {
      feed: null,
      addLike: null,
      deleteLike: null,
      saveFeed: null,
      unsaveFeed: null
  }
};

// 6. 리듀서 정의
export default handleActions(
  {
      [GET_FEEDS.SUCCESS]: (state, action) => {
          return {
              ...state,
              data: 1,
          };
      },
      [GET_FEEDS.FAILURE]: (state, action) => {
        return {
            ...state,
            error: {
                ...state.error,
                feed: action.payload.error,
            },
        };
      },
      [ADD_FEED_LIKE.FAILURE]: (state, action) => {
          return {
              ...state,
              error: {
                  ...state.error,
                  addLike: action.payload.error,
              },
          }
      },
      [DEL_FEED_LIKE.FAILURE]: (state, action) => {
          return {
              ...state,
              error: {
                  ...state.error,
                  deleteLike: action.payload.error,
              },
          }
      },
      [SAVE_FEED.FAILURE]: (state, action) => {
          return {
              ...state,
              error: {
                  ...state.error,
                  saveFeed: action.payload.error,
              },
          }
      },
      [UNSAVE_FEED.FAILURE]: (state, action) => {
          return {
              ...state,
              error: {
                  ...state.error,
                  unsaveFeed: action.payload.error,
              },
          }
      },
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* feedSaga() {
    yield takeEvery(GET_FEEDS.REQUEST, getFeedsSaga);
    yield takeEvery(ADD_FEED_LIKE.REQUEST, addFeedLikeSaga);
    yield takeEvery(DEL_FEED_LIKE.REQUEST, deleteFeedLikeSaga);
    yield takeEvery(SAVE_FEED.REQUEST, saveFeedSaga);
    yield takeEvery(UNSAVE_FEED.REQUEST, unsaveFeedSaga);
}
