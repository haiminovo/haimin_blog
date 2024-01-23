import { getArticle } from '@/api/article';
import Layout from '@/components/layout';
import { ICategoryInfo } from '@/data/mock/articlesMockData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface IArticlesData {
    created_at: string;
    id: number;
    title: string;
    description: string;
    img_url: string;
    content: string;
    seo_keyword: string;
    status: number;
    sort_order: number;
    browse: number;
    favorite_num: number;
    admin_id: number;
    category_id: number;
    updated_at: string;
    deleted_at: any;
    category_info: ICategoryInfo;
    admin_info: any;
    comment_count: number;
}

export default function ArticlePage() {
    const router = useRouter();

    const [articleData, setArticleData] = useState<IArticlesData>();
    const { id } = router.query;

    const initArtical = async () => {
        if (id) {
            const getArticalRes = await getArticle(+id);
            console.log(getArticalRes);
            if (getArticalRes.code === 200) {
                setArticleData(getArticalRes.data);
            }
        } else {
            router.push({ pathname: '/article' });
        }
    };

    useEffect(() => {
        initArtical();
    }, []);
    return (
        <Layout>
            <div>article{id}</div>
            <div>{articleData?.admin_id}</div>
            <div>{articleData?.admin_info}</div>
            <div>{articleData?.browse}</div>
            <div>{articleData?.category_id}</div>
            <div>{articleData?.category_info+''}</div>
            <div>{articleData?.comment_count}</div>
            <div>{articleData?.content}</div>
            <div>{articleData?.created_at}</div>
            <div>{articleData?.deleted_at}</div>
            <div>{articleData?.description}</div>
            <div>{articleData?.favorite_num}</div>
            <div>{articleData?.id}</div>
            <div>{articleData?.img_url}</div>
            <div>{articleData?.seo_keyword}</div>
            <div>{articleData?.sort_order}</div>
            <div>{articleData?.status}</div>
            <div>{articleData?.title}</div>
            <div>{articleData?.updated_at}</div>
        </Layout>
    );
}
