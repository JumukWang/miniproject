import { createStore, combineReducers } from 'redux';
import User from './modules/User';
import Post from './modules/Post';

const rootReducer = combineReducers({User,Post});


const store = createStore(rootReducer);

export default store;