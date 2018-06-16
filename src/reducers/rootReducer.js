import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

export default combineReducers({
    simpleReducer,
    modalReducer,
    userReducer,
});