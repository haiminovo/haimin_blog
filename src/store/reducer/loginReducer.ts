import { loginActionType } from "./constants";

// 初始值
const defaultState = {
    showLogin:false,
};

// 用于修改 user 状态的 reducer
export const loginReducer = (preState = defaultState, action: { type: loginActionType; payload: any; }) => {
    switch (action.type) {
        case loginActionType.SET_SHOW_LOGIN: // type 值都统一放到 constants
            return { ...preState, name: action.payload };
        default:
            return preState;
    }
};
