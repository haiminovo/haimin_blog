export type IArticlesData = {
    created_at: string
    id: number
    title: string
    description: string
    img_url: string
    seo_keyword: string
    status: number
    sort_order: number
    browse: number
    favorite_num: number
    admin_id: number
    category_id: number
    category_info: ICategoryInfo
    admin_info: any
};
export interface ICategoryInfo {
    id: number
    name: string
}