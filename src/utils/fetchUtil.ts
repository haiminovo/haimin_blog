import siteData from '@/data/siteData';
import { base64Encode } from './commonUtils';
import { userRefreshToken } from '@/api/user';
import { adminRefreshToken } from '@/api/admin';

export interface IFetchRes {
    code: number;
    msg: string;
    errorCode: number;
    err?: IErr;
    data?: any;
}

export interface IErr {
    errorCode: number;
    code: number;
    msg: string;
}

async function tokenRefreshMiddleware(url: string, options: RequestInit) {
    const userInf = JSON.parse(localStorage.getItem('userInf') || 'null');
    const refreshToken = userInf?.token;
    if (refreshToken) {
        const { id, isAdmin } = userInf;
        const targetInterface = isAdmin ? adminRefreshToken : userRefreshToken;
        const params: any = { id };
        const res: IFetchRes = await targetInterface(params);
        console.log(res);
        if (res?.code !== 200) return;
        userInf.token = res.data.token;
        localStorage.setItem('userInf', JSON.stringify(userInf));
        const newHeaders = {
            ...options.headers,
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `${'Basic ' + base64Encode(userInf?.token + ':')}`,
        };
        options.headers = newHeaders;
        return fetch(url, options).then(async (response) => {
            const res = await response.json();
            return res;
        });
    }
}

export const customFetch = (
    url: string = siteData.serverURL,
    method: string = 'GET',
    data: BodyInit | null = null,
    headers: HeadersInit = {}
) => {
    const userInf = localStorage.getItem('userInf');
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `${
                'Basic ' +
                base64Encode(
                    JSON.parse(
                        //decodeURIComponent(
                        userInf || 'null'
                        //   )
                    )?.token + ':'
                )
            }`,
            ...headers,
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }
    return fetch(url, options)
        .then(async (response) => {
            const res = await response.json();
            if (res.code === 401) {
                return tokenRefreshMiddleware(url, options);
            }
            return res;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
};
