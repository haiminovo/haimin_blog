import siteData from '@/data/siteData';
import { customFetch } from '@/utils/fetchUtil';
interface ICategoryCreateParams {
    name: string; //    分类名
    key: string; //   分类关键字
    parent_id?: string; //  分类父级ID
}
export const createCategory = async (params: BodyInit & ICategoryCreateParams) => {
    const res = await customFetch(siteData.serverUrl + '/category', 'POST', params);
    return res;
};

export const deleteCategory = async (id: number) => {
    const res = await customFetch(siteData.serverUrl + `/category/:${id}`, 'DELETE');
    return res;
};

export const upodateCategory = async (id: number, params: BodyInit & ICategoryCreateParams) => {
    const res = await customFetch(siteData.serverUrl + `/category/:${id}`, 'PUT', params);
    return res;
};

export const getCategory = async (id: number) => {
    const res = await customFetch(siteData.serverUrl + `/category/:${id}`);
    return res;
};

export const getCategoryList = async () => {
    const res = await customFetch(siteData.serverUrl + '/category');
    return res;
};

