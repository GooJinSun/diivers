import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  Middleware
} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import friendReducer from './friend';
import notiReducer from './notification';
import postReducer from './post';
import questionReducer from './question';
import userReducer from './user';
import loadingReducer from './loading';
import searchReducer from './search';
import likeReducer from './like';
import scrollReducer from './scroll';

const rootReducer = combineReducers({
  friendReducer,
  notiReducer,
  postReducer,
  likeReducer,
  questionReducer,
  userReducer,
  loadingReducer,
  searchReducer,
  scrollReducer
});

const isProduction = process.env.NODE_ENV !== 'development';

let middleware: Middleware[] = [];
if (!isProduction) {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default rootReducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
