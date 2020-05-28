import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './reducers/auth';
import alert from './reducers/alert';
import profile from './reducers/profile';
import article from './reducers/article';
import vote from './reducers/vote';

const rootReducer = combineReducers({ auth, alert, profile, article, vote });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
