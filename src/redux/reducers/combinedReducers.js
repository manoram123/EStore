import { combineReducers } from 'redux';
import loggedReducer from './isLogged';
import myGameStoreReducer from './myGameStore';

 const allReducers = combineReducers({
    logged: loggedReducer,
    myStore: myGameStoreReducer
 })

 export default allReducers;