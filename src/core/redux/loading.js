import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';

const prefix = 'loading/';

const START_LOADING = `${prefix}START_LOADING`;
const FINISH_LOADING = `${prefix}FINISH_LOADING`;

export const startLoading = createAction(START_LOADING);
export const finishLoading = createAction(FINISH_LOADING);

const initialState = {
  loading: false,
};

export default handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      loading: false,
    }),
  },
  initialState,
);