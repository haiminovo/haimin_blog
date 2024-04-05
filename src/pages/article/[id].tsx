import { getArticle } from '@/api/article';
import { getComment } from '@/api/comment';
import Layout from '@/components/layout';
import ReactQuillEditor from '@/components/quillEditor';
import { ICategoryInfo } from '@/data/mock/articlesMockData';
import Image from 'next/image';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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

export interface ICommentsData {
    id: number;
    content: string;
    status: number;
    article_id: number,
    user_id: number,
    email: number
}

export default function ArticlePage() {
    const router = useRouter();
    const [articleData, setArticleData] = useState<IArticlesData>();
    const [commentsData, setCommentsData] = useState<ICommentsData[]>([]);
    const contentRef: any = useRef();
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
    const initComment = async () => {
        const getCommentsRes = await getComment();
        if (getCommentsRes.code === 200) {
            setCommentsData(getCommentsRes.data.data);
        }
    };

    useEffect(() => {
        initArtical();
        initComment();
    }, []);
    useEffect(() => {
        contentRef.current.innerHTML = articleData?.content;
    }, [articleData]);
    return (
        <Layout>
            <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 32 }}>
                        {articleData?.title}
                        <Image style={{ cursor: 'pointer' }} src="/imgs/follow.svg" alt="" width={36} height={36} />
                        {articleData?.favorite_num}
                    </div>
                    <div style={{ fontSize: 18, textIndent: '2em' }}>
                        {articleData?.description}
                    </div>

                    <div ref={contentRef}></div>
                    <img src={articleData?.img_url} style={{ width: '100%' }}></img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {commentsData.map((item, index) => {
                        return (
                            <div style={{ position: 'relative' }} key={index}>
                                <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.id}楼</p>
                                    <p>{item.email}</p>
                                </div>
                                <div>
                                    {item.content}
                                </div>
                                <div style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <p style={{ display:'flex',alignItems:'center',gap:4,cursor: 'pointer' }}>
                                        喜欢
                                        <Image src="/imgs/follow.svg" alt="" width={16} height={16} />
                                    </p>

                                    <a href="">回复</a>
                                </div>

                            </div>
                        )
                    })}
                    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold' }}>评论</p>
                        <Button type='primary'>提交评论</Button>
                    </div>

                    <ReactQuillEditor></ReactQuillEditor>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", gap: 8, paddingTop: '64px' }}>
                    <div>
                        <b>文章编号：</b>
                        {id}
                    </div>
                    <div>
                        <b>作者ID：</b>
                        {articleData?.admin_id}
                    </div>
                    <div>
                        <b>用户信息：</b>
                        {articleData?.admin_info + ''}
                    </div>
                    <div>
                        <b>浏览数：</b>
                        {articleData?.browse}
                    </div>
                    <div>
                        <b>分类ID：</b>
                        {articleData?.category_id}
                    </div>
                    <div>
                        <b>分类编号：</b>
                        {articleData?.category_info.id}
                    </div>
                    <div>
                        <b>分类：</b>
                        {articleData?.category_info.name}
                    </div>
                    <div>
                        <b>评论数：</b>
                        {articleData?.comment_count}
                    </div>

                    <div>
                        <b>发布时间：</b>
                        {articleData?.created_at}
                    </div>
                    <div>
                        <b>删除时间：</b>
                        {articleData?.deleted_at}
                    </div>

                    <div>
                        <b>喜欢数：</b>
                        {articleData?.favorite_num}
                    </div>
                    <div>
                        <b>文章ID：</b>
                        {articleData?.id}
                    </div>

                    <div>
                        <b>文章关键字：</b>
                        {articleData?.seo_keyword}
                    </div>
                    <div>
                        <b>文章排序：</b>
                        {articleData?.sort_order}
                    </div>
                    <div>
                        <b>文章状态：</b>
                        {articleData?.status}
                    </div>

                    <div>
                        <b>更新时间：</b>
                        {articleData?.updated_at}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
