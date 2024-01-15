import siteData from '@/data/siteData';
import { base64Encode } from '@/utils/commonUtils';
import { customFetch } from '@/utils/fetchUtil';

interface IAdminRegisterParams {
    nickname: string;
    email: string;
    password1: string;
    password2: string;
}
export const adminRegister = async (params: IAdminRegisterParams) => {
    const res = await customFetch(siteData.serverURL + '/admin/register', 'POST', JSON.stringify(params));
    return res;
};

interface IAdminLoginParams {
    email: string;
    password: string;
}
export const adminLogin = async (params: IAdminLoginParams) => {
    const res = await customFetch(siteData.serverURL + '/admin/login', 'POST', JSON.stringify(params));
    return res;
};

export const adminAuth = async () => {
    const res = await customFetch(siteData.serverURL + '/admin/auth', 'POST', null, {
        Authorization: `${'Basic ' + base64Encode(localStorage.getItem('token') + ':')}`,
    });
    return res;
};
