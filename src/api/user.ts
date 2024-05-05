import siteData from '@/data/siteData';
import { base64Encode, getLocal, setLocal } from '@/utils/commonUtils';
import { customFetch } from '@/utils/fetchUtil';

interface IUserRegisterParams {
    nickname: string;
    email: string;
    password1: string;
    password2: string;
}
export const userRegister = async (params: BodyInit & IUserRegisterParams) => {
    const res = await customFetch(siteData.serverUrl + '/user/register', 'POST', params);
    return res;
};

interface IUserLoginParams {
    email: string;
    password: string;
}
export const userLogin = async (params: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverUrl + '/user/login', 'POST', params);
    setLocal('userInf', res.data);
    return res;
};

export const userAuth = async () => {
    const res = await customFetch(siteData.serverUrl + '/user/auth', 'POST', null, {
        Authorization: `${'Basic ' + base64Encode(getLocal('userInf')?.token + ':')}`,
    });
    return res;
};

interface IRefreshParams {
    id: number;
}

export const userRefreshToken = async (params?: BodyInit & IRefreshParams) => {
    const res = await customFetch(siteData.serverUrl + '/user/refresh', 'POST', params);
    return res;
};

// 管理员权限接口
export const getUserList = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverUrl + '/user/list', 'GET', params);
    return res;
};

export const getUserDetail = async (id: number, params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverUrl + `user/detail/${id}`, 'GET', params);
    return res;
};

export const deleteUser = async (params?: BodyInit & IUserLoginParams) => {
    const res = await customFetch(siteData.serverUrl + '/user/delete/:id', 'GET', params);
    return res;
};

export const updateUser = async (params?: BodyInit & any) => {
    const { id } = getLocal('userInf');
    const res = await customFetch(siteData.serverUrl + `/user/update/${id}`, 'PUT', params);
    return res;
};
