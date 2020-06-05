import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './reducers/auth';
import alert from './reducers/alert';
import profile from './reducers/profile';
import article from './reducers/article';
import vote from './reducers/vote';
import bookmark from './reducers/bookmark';
import comment from './reducers/comment';
import rating from './reducers/rating';
import notification from './reducers/notification';

const rootReducer = combineReducers({
  auth,
  alert,
  profile,
  article,
  vote,
  bookmark,
  comment,
  rating,
  notification
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
