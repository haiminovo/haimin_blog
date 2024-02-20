import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
    islogged: boolean;
    showLogin: boolean;
    showLogout: boolean;
}

const initialState: LoginState = {
    islogged: false,
    showLogin: false,
    showLogout: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setShowLogin: (state, action) => {
            state.showLogin = action.payload;
        },
        setShowLogout: (state, action) => {
            state.showLogout = action.payload;
        },
        setIsLogged: (state, action) => {
            state.islogged = action.payload;
        },
    },
});

export const { setShowLogin,setShowLogout, setIsLogged } = loginSlice.actions;

export default loginSlice;
