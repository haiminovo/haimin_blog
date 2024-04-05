import siteData from "@/data/siteData";
import { customFetch } from "@/utils/fetchUtil";

export const createComment = async (params: BodyInit ) => {
    const res = await customFetch(siteData.serverUrl + '/comment', 'POST', params);
    return res;
};

export const getComment = async () => {
    const res = await customFetch(siteData.serverUrl + `/comment`, 'GET');
    return res;
};