import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer'
import gameReducer from './gameReducer'

export default combineReducers({
    simpleReducer,
    modalReducer,
    userReducer,
    taskReducer,
    gameReducer,
});