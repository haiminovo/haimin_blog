import siteData from '@/data/siteData';
import { customFetch } from '@/utils/fetchUtil';
export interface ICommentData {
    article_id: number;
    content: string;
}
export const createComment = async (params: BodyInit & ICommentData) => {
    const res = await customFetch(siteData.serverUrl + '/comment', 'POST', params);
    return res;
};

export const getComment = async () => {
    const res = await customFetch(siteData.serverUrl + `/comment`, 'GET');
    return res;
};
