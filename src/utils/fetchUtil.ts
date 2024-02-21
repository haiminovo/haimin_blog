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
    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        return fetch('/api/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Refresh Token failed');
            })
            .then((data) => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                return Promise.resolve('refreshed');
            })
            .catch((error) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(error);
            });
    }
    return Promise.resolve('ok');
}

export const customFetch = (
    url: string = siteData.serverURL,
    method: string = 'GET',
    data: BodyInit | null = null,
    headers: HeadersInit = {}
) => {
    const userInf=localStorage.getItem('userInf')
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
            if(res.code===401&&)
            return res;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
};
