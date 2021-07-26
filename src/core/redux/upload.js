import axios from 'axios';
import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import CryptoJS from 'crypto-js';
import * as uploadAPI from '../../api/upload';
import { createCalcMd5Promise } from '../../util/checksum';

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'upload/';

// 2. 액션타입에 대해서 정의합니다.
const APPEND_CANDIDATES = `${prefix}APPEND_CANDIDATES`;
const FETCH_MORE_ITEMS = `${prefix}FETCH_MORE_ITEMS`;
const SHOW_MORE_ITEMS = `${prefix}SHOW_MORE_ITEMS`;
const SET_GOOGLE_DRIVE_TOKEN = `${prefix}SET_GOOGLE_DRIVE_TOKEN`;
const UPLOAD_PHOTOS = `${prefix}UPLOAD_PHOTOS`;

// 3. 액션함수에 대해서 정의합니다.
export const appendCandidates = createAction(APPEND_CANDIDATES, payload => payload);
export const setGoogleDriveToken = createAction(SET_GOOGLE_DRIVE_TOKEN, payload => payload);
export const fetchMoreItems = createAction(FETCH_MORE_ITEMS, ({newData, fetchUntil, googleDriveToken}) => ({newData, fetchUntil, googleDriveToken}));
export const showMoreItems = createAction(SHOW_MORE_ITEMS, ({newData, nextNumShowItems}) => ({newData, nextNumShowItems}));
export const uploadPhotos = createAction(UPLOAD_PHOTOS, ({data, googleDriveToken}) => ({data, googleDriveToken}));

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
function* fetchMoreItemsSaga({payload: {newData, fetchUntil, googleDriveToken}}) {
  yield put(startLoading());
  // 이전에 데이터 요청한 적이 있어 이미 데이터 있는 사진들은 제외하고 데이터 요청
  const requests = newData.map((data, index) => data.blob ?
    null :
    { index,
      request: axios.get(`https://www.googleapis.com/drive/v3/files/${data.id}?alt=media`, {
        headers: {
          'Authorization': `Bearer ${googleDriveToken}`
        },
        responseType: 'blob'
      })
    }
  ).filter(data => data !== null);
      
  const responses = yield axios.all(requests.map(({request}) => request));
  // response 들을 newData에 채워넣음
  let i = 0;
  for (let j =0; j < requests.length; j++) {
    if (requests[j]) {
      const index = requests[j].index;
      newData[index].blob = responses[i].data;
      newData[index].url = URL.createObjectURL(newData[index].blob);
      i++;
    }
  }

  yield put(showMoreItems({
    newData,
    nextNumShowItems: fetchUntil,
  }));

  yield put(finishLoading());
}

function* uploadPhotosSaga({payload: {data, googleDriveToken}}) {
  yield put(startLoading());
  // 데이터 불러오기
  const blobs = [];
  // 이전에 불러온적 있는 데이터는 그 데이터 사용
  for (let i = 0; i < data.length; i++) {
    if (data[i].blob) {
      blobs[i] = data[i].blob;
    }
  }
  // 나머지 사진들은 axios.all 로 한번에 데이터 요청
  const requests = data.map((data, index) => data.blob ?
    null :
    { index,
      request: axios.get(`https://www.googleapis.com/drive/v3/files/${data.id}?alt=media`, {
        headers: {
          'Authorization': `Bearer ${googleDriveToken}`
        },
        responseType: 'blob'
      })
    }
  ).filter(data => data !== null);
    
  const responses = yield axios.all(requests.map(({request}) => request));
  let i = 0;
  for (let j =0; j < requests.length; j++) {
    if (requests[j]) {
      const index = requests[j].index;
      blobs[index] = responses[i].data;
      i++;
    }
  }

  // blob 데이터로 checksum 한번에 계산
  const checksums = yield Promise.all(blobs.map(blob => createCalcMd5Promise(blob)));

  // presigned url 불러오기
  const response = yield uploadAPI.getPresignedURLs(checksums);
  const presignedURLs = response.data;
  
  // s3에 저장요청하기
  for (let i = 0; i < data.length; i++) {
    // 이미 누군가 업로드한 사진은 다시 업로드 하지 않음.
    if (!presignedURLs[i]) {
      continue;
    }
    const res = yield axios.put(presignedURLs[i], blobs[i], {
      headers: {
        'Content-Type': data[i].mimeType
      }
    });
  }
  yield put(finishLoading());
  alert('50% 업로드 완료');
}

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
export function* uploadSaga() {
  yield takeEvery(FETCH_MORE_ITEMS, fetchMoreItemsSaga);
  yield takeEvery(UPLOAD_PHOTOS, uploadPhotosSaga);
}