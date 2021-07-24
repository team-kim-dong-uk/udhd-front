import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'upload/';

// 2. 액션타입에 대해서 정의합니다.
const APPEND_CANDIDATES = `${prefix}APPEND_CANDIDATES`;
const SHOW_MORE_ITEMS = `${prefix}SHOW_MORE_ITEMS`;
const SET_GOOGLE_DRIVE_TOKEN = `${prefix}SET_GOOGLE_DRIVE_TOKEN`;

// 3. 액션함수에 대해서 정의합니다.
export const appendCandidates = createAction(APPEND_CANDIDATES, payload => payload);
export const setGoogleDriveToken = createAction(SET_GOOGLE_DRIVE_TOKEN, payload => payload);
export const showMoreItems = createAction(SHOW_MORE_ITEMS, payload => payload);

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.

// 5. 초기 상태 정의
const initialState = {
  data: [],
  loading: false,
  error: null,
  googleDriveToken: null,
  numShowItems: 0
};

// 6. 리듀서 정의
export default handleActions(
  {
    [APPEND_CANDIDATES]: (state, action) => {
        return {
          ...state,
          data: [...action.payload, ...state.data],
          numShowItems: 0,
        };
    },
    [SHOW_MORE_ITEMS]: (state, action) => {
      const { newData, nextNumShowItems } = action.payload;
      console.log(state.data);
      console.log(state.numShowItems, newData.length, newData);
      let dataCopy = [...state.data];
      dataCopy.splice(state.numShowItems, newData.length, ...newData)
      return {
        ...state,
        data: dataCopy,
        numShowItems: nextNumShowItems,
      };
  },
    [SET_GOOGLE_DRIVE_TOKEN]: (state, action) => {
      return {
        ...state,
        googleDriveToken: action.payload
      }
    }
  },
  initialState,
);

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
