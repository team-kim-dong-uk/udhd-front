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
const GET_FEEDS_LIKE = asyncActionCreator(`${prefix}GET_FEEDS_LIKE`);
const GET_FEEDS_SAVE = asyncActionCreator(`${prefix}GET_FEEDS_SAVE`);
const GET_NEW_FEEDS_RELATED = asyncActionCreator(`${prefix}GET_NEW_FEEDS_RELATED`);
const GET_MORE_FEEDS_RELATED = asyncActionCreator(`${prefix}GET_MORE_FEEDS_RELATED`);

const ADD_FEED_LIKE = asyncActionCreator(`${prefix}ADD_FEED_LIKE`);
const DEL_FEED_LIKE = asyncActionCreator(`${prefix}DEL_FEED_LIKE`);

const SAVE_FEED = asyncActionCreator(`${prefix}SAVE_FEED`);
const UNSAVE_FEED = asyncActionCreator(`${prefix}UNSAVE_FEED`);

const ADD_FEED_COMMENT = asyncActionCreator(`${prefix}ADD_FEED_COMMENT`);
const DELETE_FEED_COMMENT = asyncActionCreator(`${prefix}DELETE_FEED_COMMENT`);

// 3. 액션함수에 대해서 정의합니다.
//photoId: optional
export const getFeeds = createAsyncAction(GET_FEEDS);
export const getFeedsLike = createAsyncAction(GET_FEEDS_LIKE, ({type, userId, count, page}) => ({type, userId, count, page}));
export const getFeedsSave = createAsyncAction(GET_FEEDS_SAVE, ({type, userId, count, page}) => ({type, userId, count, page}));
export const getNewFeedsRelated = createAsyncAction(GET_NEW_FEEDS_RELATED, ({photoId}) => ({photoId}));
export const getMoreFeedsRelated = createAsyncAction(GET_MORE_FEEDS_RELATED, ({photoId}) => ({photoId}));

export const addFeedLike = createAsyncAction(ADD_FEED_LIKE, ({feedId, authData}) => ({feedId, authData}));
export const deleteFeedLike = createAsyncAction(DEL_FEED_LIKE, ({feedId, authData}) => ({feedId, authData}));

export const saveFeed = createAsyncAction(SAVE_FEED, ({feedId}) => ({feedId}));
export const unsaveFeed = createAsyncAction(UNSAVE_FEED, ({feedId}) => ({feedId}));

export const addFeedComment = createAsyncAction(ADD_FEED_COMMENT, ({ feedId, content }) => ({ feedId, content }));
export const deleteFeedComment = createAsyncAction(DELETE_FEED_COMMENT, ({ feedId, commentId }) => ({ feedId, commentId }));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getFeedsSaga = createAsyncSaga(getFeeds, feedAPI.getFeeds);
const getFeedsLikeSaga = createAsyncSaga(getFeedsLike, feedAPI.getFeedsByType);
const getFeedsSaveSaga = createAsyncSaga(getFeedsSave, feedAPI.getFeedsByType);
const getNewFeedsRelatedSaga = createAsyncSaga(getNewFeedsRelated, feedAPI.getFeedsRelated);
const getMoreFeedsRelatedSaga = createAsyncSaga(getMoreFeedsRelated, feedAPI.getFeedsRelated);

const addFeedLikeSaga = createAsyncSaga(addFeedLike, feedAPI.addFeedLike);
const deleteFeedLikeSaga = createAsyncSaga(deleteFeedLike, feedAPI.deleteFeedLike);
const saveFeedSaga = createAsyncSaga(saveFeed, feedAPI.saveFeed);
const unsaveFeedSaga = createAsyncSaga(unsaveFeed, feedAPI.unsaveFeed);

const addFeedCommentSaga = createAsyncSaga(addFeedComment, feedAPI.addComment);
const deleteFeedCommentSaga = createAsyncSaga(deleteFeedComment, feedAPI.deleteComment);

// 5. 초기 상태 정의
const initialState = {
  feeds: {
    data: [],
    error: null
  },
  feedsLike: {
    data: [],
    error: null,
    page: 0,
  },
  feedsSave: {
    data: [],
    error: null,
    page: 0,
  },
  feedsRelated: {
    data: [],
    error: null,
  },
  isEnd: false,
  loading: false,
  error: {
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
              feeds: {
                  data: action.payload.data.feeds,
                  error: null,
              },
          };
      },
      [GET_FEEDS.FAILURE]: (state, action) => {
        return {
            ...state,
            feeds: {
                data: state.feeds.data,
                error: action.payload.error,
            },
        };
      },
      [GET_NEW_FEEDS_RELATED]: (state, action) => {
        return {
          ...state,
          feedsRelated: {
            data: action.payload.data.feeds,
            error: null,
          },
        }
      },
      [GET_MORE_FEEDS_RELATED]: (state, action) => {
        return {
          ...state,
          feedsRelated: {
            data: [...state.feedsRelated.data, ...action.payload.data.feeds],
            error: null,
          },
        }
      },
      [GET_FEEDS_LIKE.SUCCESS]: (state, action) => {
          if (!action.payload.config.url.includes("page")){
              return {
                  ...state,
                  feedsLike: {
                      data: action.payload.data.feeds,
                      error: null,
                      page: 0,
                  },
              };
          } else {
              return {
                  ...state,
                  feedsLike: {
                      data: state.feedsLike.data.concat(action.payload.data.feeds),
                      error: null,
                      page: action.payload.page,
                  },
              };
          }
      },
      [GET_FEEDS_LIKE.FAILURE]: (state, action) => {
          return {
              ...state,
              feedsLike: {
                  data: state.feedsLike.data,
                  error: action.payload.error,
                  page: state.feedsLike.page,
              },
          };
      },
      [GET_FEEDS_SAVE.SUCCESS]: (state, action) => {
          if (!action.payload.config.url.includes("page")){
              return {
                  ...state,
                  feedsSave: {
                      data: action.payload.data.feeds,
                      error: null,
                      page: 0,
                  },
              };
          } else {
              return {
                  ...state,
                  feedsSave: {
                      data: state.feedsSave.data.concat(action.payload.data.feeds),
                      error: null,
                      page: state.feedsSave.page+1,
                  },
              };
          }
      },
      [GET_FEEDS_SAVE.FAILURE]: (state, action) => {
          return {
              ...state,
              feedsSave: {
                  data: state.feedsSave.data,
                  error: action.payload.error,
                  page: state.feedsSave.page,
              },
          };
      },
      [ADD_FEED_LIKE.FAILURE]: (state, action) => {
          console.log(action.payload.error);
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
      [ADD_FEED_COMMENT.SUCCESS]: (state, action) => {
        const modifiedFeed = action.payload.data;
        return {
            ...state,
            feeds: {
                data: state.feeds.data.map(item => item.id === modifiedFeed.id ? modifiedFeed : item),
            },
        };
      },
      [DELETE_FEED_COMMENT.SUCCESS]: (state, action) => {
        const modifiedFeed = action.payload.data;
        return {
            ...state,
            feeds: {
                data: state.feeds.data.map(item => item.id === modifiedFeed.id ? modifiedFeed : item),
            },
        };
      },
      [ADD_FEED_COMMENT.FAILURE]: (state, action) => {
        console.log(action.payload);
        return {
            ...state,
            error: {
                ...state.error,
                addComment: action.payload,
            },
        };
      },
      [DELETE_FEED_COMMENT.FAILURE]: (state, action) => {
        return {
            ...state,
            error: {
                ...state.error,
                deleteComment: action.payload.error,
            },
        };
      },

  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* feedSaga() {
    yield takeEvery(GET_FEEDS.REQUEST, getFeedsSaga);
    yield takeEvery(GET_FEEDS_LIKE.REQUEST, getFeedsLikeSaga);
    yield takeEvery(GET_FEEDS_SAVE.REQUEST, getFeedsSaveSaga);
    yield takeEvery(GET_NEW_FEEDS_RELATED.REQUEST, getNewFeedsRelated);
    yield takeEvery(GET_MORE_FEEDS_RELATED.REQUEST, getMoreFeedsRelated);
    yield takeEvery(ADD_FEED_LIKE.REQUEST, addFeedLikeSaga);
    yield takeEvery(DEL_FEED_LIKE.REQUEST, deleteFeedLikeSaga);
    yield takeEvery(SAVE_FEED.REQUEST, saveFeedSaga);
    yield takeEvery(UNSAVE_FEED.REQUEST, unsaveFeedSaga);
    yield takeEvery(ADD_FEED_COMMENT.REQUEST, addFeedCommentSaga);
    yield takeEvery(DELETE_FEED_COMMENT.REQUEST, deleteFeedCommentSaga);
}
