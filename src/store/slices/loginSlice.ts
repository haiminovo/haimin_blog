import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
    isShowLogin: boolean;
}

const initialState: LoginState = {
    isShowLogin: true,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setShowLogin: (state,action) => {
            state.isShowLogin = action.payload;
        },
    },
});

export const { setShowLogin } = loginSlice.actions;

export default loginSlice.reducer;
