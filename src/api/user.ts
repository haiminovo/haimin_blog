import siteData from '@/data/siteData';
import { base64Encode } from '@/utils/commonUtils';
import { customFetch } from '@/utils/fetchUtil';

interface IUserRegisterParams {
    nickname: string;
    email: string;
    password1: string;
    password2: string;
}
export const userRegister = async (params: BodyInit & IUserRegisterParams) => {
    const res = await customFetch(siteData.serverURL + '/user/register', 'POST', params);
    return res;
};

interface IUserLoginParams {
    email: string;
    password: string;
}
export const userLogin = async (params: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/user/login', 'POST', params);
    localStorage.setItem(
        'userInf',
        //encodeURIComponent(
        JSON.stringify(res.data)
        //    )
    );
    return res;
};

export const userAuth = async () => {
    const res = await customFetch(siteData.serverURL + '/user/auth', 'POST', null, {
        Authorization: `${
            'Basic ' +
            base64Encode(
                JSON.parse(
                    //decodeURIComponent(
                    localStorage.getItem('userInf') || 'null'
                    //   )
                )?.token + ':'
            )
        }`,
    });
    return res;
};

interface IRefreshParams {
    id: number;
}

export const userRefreshToken = async (params?: BodyInit & IRefreshParams) => {
    const res = await customFetch(siteData.serverURL + '/user/refresh', 'POST', params);
    return res;
};

// 管理员权限接口
export const getUserList = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/user/list', 'GET', params);
    return res;
};

export const getUserDetail = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/user/detail/:id', 'GET', params);
    return res;
};

export const deleteUser = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/user/delete/:id', 'GET', params);
    return res;
};

export const updateUser = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/user/update/:id', 'GET', params);
    return res;
};
