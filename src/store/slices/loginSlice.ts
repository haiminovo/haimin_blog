import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
    showLogin: boolean;
}

const initialState: LoginState = {
    showLogin: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setShowLogin: (state,action) => {
            state.showLogin = action.payload;
        },
    },
});

export const { setShowLogin } = loginSlice.actions;

export default loginSlice;
