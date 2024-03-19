import siteData from '@/data/siteData';
import { base64Encode, getLocal, setLocal } from '@/utils/commonUtils';
import { customFetch } from '@/utils/fetchUtil';

interface IAdminRegisterParams {
    nickname: string;
    email: string;
    password1: string;
    password2: string;
}
export const adminRegister = async (params: BodyInit & IAdminRegisterParams) => {
    const res = await customFetch(siteData.serverUrl + '/admin/register', 'POST', params);
    return res;
};

interface IAdminLoginParams {
    email: string;
    password: string;
}
export const adminLogin = async (params: BodyInit & IAdminLoginParams) => {
    const res = await customFetch(siteData.serverUrl + '/admin/login', 'POST', params);
    setLocal('userInf', res.data);
    return res;
};

export const adminAuth = async () => {
    const res = await customFetch(siteData.serverUrl + '/admin/auth', 'POST', null, {
        Authorization: `${'Basic ' + base64Encode(getLocal('userInf')?.token + ':')}`,
    });
    return res;
};

interface IRefreshParams {
    id: number;
}

export const adminRefreshToken = async (params?: BodyInit & IRefreshParams) => {
    const res = await customFetch(siteData.serverUrl + '/admin/refresh', 'POST', params);
    return res;
};
