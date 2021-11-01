import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
import rootSaga from '../saga';
import storageSession from 'redux-persist/lib/storage/session';
import {persistReducer, persistStore} from "redux-persist";
import SetTransform from "../../util/SetTransform";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );

  const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage: storageSession,
    transforms: [SetTransform]
    //
    //whitelist: ["auth"]
    // or blacklist
  };

  //const store = createStore(reducer, enhancer);
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = makeConfiguredStore(persistedReducer,  enhancer);

  store.__persistor = persistStore(store);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const makeConfiguredStore = (reducer, enhancer) =>
    createStore(reducer, enhancer);

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
