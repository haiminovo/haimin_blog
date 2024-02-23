import siteData from '@/data/siteData';
import { base64Encode } from './commonUtils';

export interface IFetchRes {
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

function tokenRefreshMiddleware(response: any) {
    if (response.status !== 401) return;
    const userInf = JSON.parse(localStorage.getItem('userInf') || 'null');
    const refreshToken = userInf?.token;
    if(refreshToken){
        
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
            console.log(res);
            tokenRefreshMiddleware(res);
            return res;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
};
