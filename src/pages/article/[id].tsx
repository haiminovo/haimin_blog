import { getArticle, likeArticle } from '@/api/article';
import { ICommentData, createComment, getComment } from '@/api/comment';
import Layout from '@/components/layout';
import ReactQuillEditor from '@/components/quillEditor';
import { ICategoryInfo } from '@/data/mock/articlesMockData';
import Image from 'next/image';
import { Button, Flex, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getLocal, timestampToTime } from '@/utils/commonUtils';
import { now } from 'lodash';
import { log } from 'console';

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
    email: number,
    created_at: string;
}

export default function ArticlePage() {
    const router = useRouter();
    const [articleData, setArticleData] = useState<IArticlesData>();
    const [commentsData, setCommentsData] = useState<ICommentsData[]>([]);
    const [currentComment, setCurrentComment] = useState<any>();
    const [like,setLike]= useState(false);
    const { id: articalId } = router.query;
    const initArtical = async () => {
        if (articalId) {
            const getArticalRes = await getArticle(+articalId);
            if (getArticalRes.code === 200) {
                setArticleData(getArticalRes.data);
                setCommentsData(getArticalRes.data.comment.reverse());
            }
        } else {
            router.push({ pathname: '/article' });
        }
    };
    const handleSubmitComment = async () => {
        const userInf = getLocal('userInf');
        if (articalId&&userInf) {
            const { email, id: userId } = userInf;
            const params: any = {
                article_id: +articalId,
                user_id: userId,
                content: currentComment,
                email: email
            };
            try {
                const res = await createComment(params);
                if(res.code===200){
                   message.success('评论成功！')
                }
                console.log(res);
            } catch (error) {
            }
        }
        else{
            message.warning('请先登录')
        }
    }
    const handleLikeClick = async ()=>{
        if(articalId&&!like&&articleData){
            const res = await likeArticle(+articalId);
            setLike(true)
            const newData:any = {...articleData,favorite_num: ++articleData.favorite_num}
            setArticleData(newData);
        }
    }



    useEffect(() => {
        initArtical();
    }, []);
    return (
        <Layout>
            <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 32 }}>
                        <p>{articleData?.title}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image onClick={()=>handleLikeClick()} style={{ cursor: 'pointer' }} src={like?"/imgs/follow-fill.svg":"/imgs/follow.svg"} alt="" width={36} height={36} />
                            {articleData?.favorite_num}
                        </div>

                    </div>
                    <div style={{ fontSize: 18, textIndent: '2em' }}>
                        {articleData?.description}
                    </div>
                    {articleData && <div dangerouslySetInnerHTML={{ __html: articleData.content }} ></div>}
                    <img src={articleData?.img_url} style={{ width: '100%' }}></img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {commentsData.map((item, index) => {
                        return (
                            <div style={{ position: 'relative' }} key={index}>
                                <div style={{ height: 1, width: '100%', backgroundColor: '#000' }}></div>
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{index + 1}楼</p>
                                    <p>{item.email}</p>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: item.content }}>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 16 }}>
                                    <div>{item.created_at}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                            喜欢
                                            <Image src="/imgs/follow.svg" alt="" width={16} height={16} />
                                        </p>
                                        <a href="">回复</a>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bold' }}>评论</p>
                        <Button type='primary' onClick={() => handleSubmitComment()}>提交评论</Button>
                    </div>
                    <ReactQuillEditor value={currentComment} onChange={(value) => setCurrentComment(value)}></ReactQuillEditor>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", gap: 8, paddingTop: '64px' }}>
                    <div>
                        <b>文章编号：</b>
                        {articalId}
                    </div>
                    <div>
                        <b>作者ID：</b>
                        {articleData?.admin_id}
                    </div>
                    <div>
                        <b>作者名称：</b>
                        {articleData?.admin_info?.nickname||articleData?.admin_info?.username}
                    </div>
                    <div>
                        <b>浏览数：</b>
                        {articleData?.browse}
                    </div>
                    <div>
                        <b>分类ID: </b>
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
                    {/* <div>
                        <b>删除时间：</b>
                        {articleData?.deleted_at}
                    </div> */}

                    <div>
                        <b>喜欢数：</b>
                        {articleData?.favorite_num}
                    </div>
                    <div>
                        <b>文章ID: </b>
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
