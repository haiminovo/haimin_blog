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

export const customFetch = (
    url: string = siteData.serverURL,
    method: string = 'GET',
    data: BodyInit | null = null,
    headers: HeadersInit = {}
) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `${'Basic ' + base64Encode(JSON.parse(decodeURIComponent(localStorage.getItem('userInf')||'null'))?.token + ':')}`,
            ...headers
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }
    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
};
