import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../store/slices/loginSlice';
export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
