import siteData from '@/data/siteData';
import { base64Encode } from '@/utils/commonUtils';
import { customFetch } from '@/utils/fetchUtil';

interface IAdminRegisterParams {
    nickname: string;
    email: string;
    password1: string;
    password2: string;
}
export const adminRegister = async (params: BodyInit & IAdminRegisterParams) => {
    const res = await customFetch(siteData.serverURL + '/admin/register', 'POST', params);
    return res;
};

interface IAdminLoginParams {
    email: string;
    password: string;
}
export const adminLogin = async (params: BodyInit & IAdminLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/admin/login', 'POST', params);
    localStorage.setItem('token',res.data.token);
    return res;
};

export const adminAuth = async () => {
    const res = await customFetch(siteData.serverURL + '/admin/auth', 'POST', null, {
        Authorization: `${'Basic ' + base64Encode(localStorage.getItem('token') + ':')}`,
    });
    return res;
};
