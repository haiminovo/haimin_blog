import siteData from '@/data/siteData';
import { customFetch } from '@/utils/fetchUtil';
interface IArticleCreateParams {
    title: string; //    标题
    admin_id: string; //   作者
    description: string; //  简介
    seo_keyword: string; //  关键字
    content: string; //  内容
    img_url: string; //    封面url
    category_id: string; //  分类id
    browser?: string; //  浏览数
}
export const createArticle = async (params: BodyInit & IArticleCreateParams) => {
    const res = await customFetch(siteData.serverURL + '/article', 'POST', params);
    return res;
};

export const deleteArticle = async (id: number) => {
    const res = await customFetch(siteData.serverURL + `/article/:${id}`, 'DELETE');
    return res;
};

export const upodateArticle = async (id: number, params: BodyInit & IArticleCreateParams) => {
    const res = await customFetch(siteData.serverURL + `/article/:${id}`, 'PUT', params);
    return res;
};

export const getArticle = async (id: number) => {
    const res = await customFetch(siteData.serverURL + `/article/${id}`);
    return res;
};

interface IGetArticleListParams {
    page?: number; //    分页
    desc?: 'created_at' | 'browse'; //   排序，默认最新：created_at，浏览次数：browse
    category_id?: string; //  分类id
    seo_keyword?: string; //  关键字
}
export const getArticleList = async (params?: IGetArticleListParams & BodyInit) => {
    const res = await customFetch(siteData.serverURL + '/article', 'GET', params || undefined);
    return res;
};

interface IArticleSearchParams {
    keyword: string;
    page: number;
    desc: 'created_at' | 'browse';
}
export const searchArticle = async (params: IArticleSearchParams) => {
    const res = await customFetch(siteData.serverURL + `/search/article`);
    return res;
};
