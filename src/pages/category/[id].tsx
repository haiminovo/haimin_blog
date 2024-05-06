import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { IArticlesData } from '@/data/mock/articlesMockData';
import { getArticleList, getArticleListByCategory } from '@/api/article';
import { useRouter } from 'next/router';
import ArticleList from '@/components/articleList';

export default function ArticlesPage() {
    const router = useRouter();
    const { id } = router.query;
    const [articlesData, setArticlesData] = useState<IArticlesData[]>([]);

    const initArticleList = async () => {
        if (id) {
            const articleListRes = await getArticleListByCategory(+id);
            if (articleListRes?.code === 200) {
                setArticlesData(articleListRes.data?.data);
            } else {
                return;
            }
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
