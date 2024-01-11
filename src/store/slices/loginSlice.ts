import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
    isShowLogin: boolean;
}

const initialState: LoginState = {
    isShowLogin: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        showLogin: (state) => {
            state.isShowLogin = true;
        },
        unShowLogin: (state) => {
            state.isShowLogin = false;
        },
    },
});

export const { showLogin, unShowLogin } = loginSlice.actions;

export default loginSlice.reducer;
