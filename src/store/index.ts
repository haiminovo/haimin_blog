import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../store/slices/loginSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//  持久化redux配置
const persistConfig = {
    key: 'root',
    storage: storage, // 缓存机制
    whitelist: ['login'], // reducer 里持久化的数据,除此外均为不持久化数据
};

const reducers = combineReducers({
    login: loginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            //关闭redux序列化检测
            serializableCheck: false,
        }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
