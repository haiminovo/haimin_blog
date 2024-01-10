import { combineReducers } from 'redux';
import { loginReducer } from './reducer/loginReducer';
import { configureStore } from '@reduxjs/toolkit';

// 使用redux的combineReducers方法将所有reducer打包起来
const store = configureStore({ reducer: combineReducers({ login: loginReducer }) });

export default store;
