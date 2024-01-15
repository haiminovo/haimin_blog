import siteData from '@/data/siteData';
import { customFetch } from '@/utils/fetchUtil';
interface IArticalCreateParams {
    title: string; //    标题
    author: string; //   作者
    description: string; //  简介
    keyword: string; //  关键字
    content: string; //  内容
    cover: string; //    封面url
    category_id: string; //  分类id
    browser?: string; //  浏览数
}
export const createArtical = async (params: IArticalCreateParams) => {
    const res = await customFetch(siteData.serverURL + '/artical', 'POST', JSON.stringify(params));
    return res;
};

export const deleteArtical = async (id: number) => {
    const res = await customFetch(siteData.serverURL + `/artical/:${id}`, 'DELETE');
    return res;
};

export const upodateArtical = async (id: number, params: IArticalCreateParams) => {
    const res = await customFetch(siteData.serverURL + `/artical/:${id}`, 'PUT', JSON.stringify(params));
    return res;
};

export const getArtical = async (id: number) => {
    const res = await customFetch(siteData.serverURL + `/artical/:${id}`);
    return res;
};

interface IGetArticalListParams {
    page: number; //    分页
    desc: 'created_at' | 'browse'; //   排序，默认最新：created_at，浏览次数：browse
    category_id: string; //  分类id
    keyword: string; //  关键字
}
export const getArticalList = async (params: IGetArticalListParams) => {
    const res = await customFetch(siteData.serverURL + '/artical');
    return res;
};

interface IArticalSearchParams{
    keyword:string;
    page:number;
    desc: 'created_at' | 'browse';
}
export const searchArtical = async (params: IArticalSearchParams) => {
    const res = await customFetch(siteData.serverURL + `/search/artical`);
    return res;
};