import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { IArticlesData } from '@/data/mock/articlesMockData';
import { getArticleList } from '@/api/article';
import { useRouter } from 'next/router';
import ArticalList from '@/components/articalList';

export default function ArticlesPage() {
    const router = useRouter();
    const [articlesData, setArticlesData] = useState<IArticlesData[]>([]);

    const initArticleList = async () => {
        const articleListRes = await getArticleList();
        if (articleListRes?.code === 200) {
            setArticlesData(articleListRes.data?.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        initArticleList();
    }, []);

    return (
        <Layout>
           <ArticalList articlesData={articlesData}></ArticalList>
        </Layout>
    );
}
