import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducers = {

};

const combinedReducers = combineReducers({ ...reducers, router: routerReducer });

export default combinedReducers;
