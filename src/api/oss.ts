import siteData from "@/data/siteData";
import { customFetch } from "@/utils/fetchUtil";

export const getUploadToken = async (params?: BodyInit) => {
    const res = await customFetch(siteData.serverURL + '/oss/token', 'GET', params);
    return res;
};

interface IUploadParam{
    token:string,
    file:any;
}

const baseOSSUrl = 'http://upload-z0.qiniup.com';

export const upload = async (params?: BodyInit & IUploadParam) => {
    const res = await customFetch(baseOSSUrl, 'POST', params);
    return res;
};
