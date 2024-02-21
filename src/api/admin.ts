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
    localStorage.setItem(
        'userInf',
        //encodeURIComponent(
        JSON.stringify(res.data)
        //    )
    );
    return res;
};

export const adminAuth = async () => {
    const res = await customFetch(siteData.serverURL + '/admin/auth', 'POST', null, {
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
