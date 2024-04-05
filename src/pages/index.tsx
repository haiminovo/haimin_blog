import Layout from '@/components/layout';
import LineBallCanvas from '@/components/lineBallCanvas';
import { Carousel } from 'antd';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Image from 'next/image';
import { getArticleList } from '@/api/article';
import ArticleList from '@/components/articleList';
import { useRouter } from 'next/router';
import { IArticlesData } from './article/[id]';

export default function Home() {
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const onChange = (currentSlide: number) => { };

    const scrollBox = useRef<any>();
    const handleLastMidItemHover = (current: any) => {
        const range = current.target.offsetLeft - 640;
        console.log(range);
        scrollBox.current.scrollTo({
            left: range,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        setCategoryList([
            { src: '/imgs/category0.png', title: '病状咨询', num: '24' },
            { src: '/imgs/category1.png', title: '病状咨询', num: '24' },
            { src: '/imgs/category2.png', title: '病状咨询', num: '24' },
            { src: '/imgs/category3.png', title: '病状咨询', num: '24' },
            { src: '/imgs/category4.png', title: '病状咨询', num: '24' },
            { src: '/imgs/category5.png', title: '病状咨询', num: '24' },
        ]);
    }, []);
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
            <div className={style.main}>
                {/* <LineBallCanvas></LineBallCanvas> */}
                <div className={style.main__top}>
                    <Carousel className={style.cards} autoplay afterChange={onChange}>
                        <Image
                            alt="banner0"
                            src="/imgs/banner0.png"
                            width={990}
                            height={320}
                            className={style.card}
                            unoptimized
                        />
                        <Image
                            alt="banner1"
                            src="/imgs/banner1.png"
                            width={990}
                            height={320}
                            className={style.card}
                            unoptimized
                        />
                        <Image
                            alt="banner2"
                            src="/imgs/banner2.png"
                            width={990}
                            height={320}
                            className={style.card}
                            unoptimized
                        />
                    </Carousel>
                </div>
                <div className={style.main__mid}>
                    <div className={style.box} ref={scrollBox}>
                        {categoryList.map((item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={style.item}
                                    onMouseEnter={debounce((current) => handleLastMidItemHover(current), 500)}
                                >
                                    <Image alt="" src={item.src} width={154} height={154} unoptimized />
                                    <div className={style.inf}>
                                        <p>{item.title}</p>
                                        <p>文章数：{item.num}</p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <ArticleList articlesData={articlesData}></ArticleList>
                </div>
            </div>
        </Layout>
    );
}
