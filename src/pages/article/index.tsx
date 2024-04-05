import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { IArticlesData } from '@/data/mock/articlesMockData';
import { getArticleList } from '@/api/article';
import { useRouter } from 'next/router';
import ArticleList from '@/components/articleList';

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
           <ArticleList articlesData={articlesData}></ArticleList>
        </Layout>
    );
}
