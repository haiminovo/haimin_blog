import style from './article.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { IArticlesData } from '@/data/mock/articlesMockData';
import { getArticleList } from '@/api/article';
import { useRouter } from 'next/router';

export default function ArticlesPage() {
    const router = useRouter();
    const [articlesData, setArticlesData] = useState<IArticlesData[]>([]);

    const initArticleList = async () => {
        const articleListRes = await getArticleList();
        if (articleListRes.code === 200) {
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
            <div className={style.articles}>
                {articlesData.map((item: IArticlesData) => {
                    return (
                        <div
                            className={style.article}
                            key={item.id}
                            onClick={() => {
                                router.push({ pathname: `article/${item.id}` });
                            }}
                        >
                            <div className={style.articleBox}>
                                <div className={style.articleBox__main}>
                                    <div className={style.articleBox__title}>{item.title}</div>
                                    <div className={style.articleBox__description}>{item.description}</div>
                                    <div className={style.articleBox__infBox}>
                                        <div className={style.articleBox__inf}>
                                            <div>{item.admin_info}</div>
                                            <div>{item.browse}</div>
                                            <div>{item.favorite_num}</div>
                                        </div>
                                        <div className={style.articleBox__tags}>
                                            {item?.seo_keyword?.split(',').map((tag, index) => {
                                                return (
                                                    <span className={style.articleBox__tag} key={index}>
                                                        {tag}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <Image
                                    className={style.articleBox__img}
                                    width={80}
                                    height={80}
                                    src={item.img_url}
                                    alt={item.title || ''}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}
