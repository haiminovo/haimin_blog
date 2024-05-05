import { IArticlesData } from '@/data/mock/articlesMockData';
import router from 'next/router';
import Image from 'next/image';
import style from './index.module.scss';
import { deleteArticle } from '../../api/article';
import { Modal } from 'antd';

interface IProps {
    canDelete?: boolean;
    articlesData: IArticlesData[];
}

export default function ArticleList({ canDelete = false, articlesData }: IProps) {
    const handleDeleteArticle = async (id: number) => {
        Modal.confirm({
            title: '确认删除该文章？',
            content: '',
            okText:'确认',
            cancelText:'取消',
            onOk:async ()=>{
                 const res = await deleteArticle(id)
                 router.reload()
            }
          });
       

    }
    return (
        <div className={style.articles}>
            {articlesData.map((item: IArticlesData) => {
                const tags = item?.seo_keyword?.split(',');
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
                                <div className={style.articleBox__description}>{item.description || '暂无简介，点击查看详情'}</div>
                                <div className={style.articleBox__infBox}>
                                    <div className={style.articleBox__inf}>
                                        <div className={style.articleBox__info}>{item.admin_info?.nickname}</div>
                                        <div className={style.articleBox__info}>
                                            <Image src="/imgs/view-fill.svg" alt="" width={16} height={16} />
                                            {item.browse}
                                        </div>
                                        <div className={style.articleBox__info}>
                                            <Image src="/imgs/follow.svg" alt="" width={16} height={16} />
                                            {item.favorite_num}
                                        </div>
                                    </div>

                                    <div className={style.articleBox__tags}>
                                        {tags.length > 0 &&
                                            tags?.map((tag, index) => {
                                                return (
                                                    tag.trim() && (
                                                        <span className={style.articleBox__tag} key={index}>
                                                            {tag}
                                                        </span>
                                                    )
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            {item.img_url ?
                                <Image
                                    className={style.articleBox__img}
                                    width={80}
                                    height={80}
                                    src={item.img_url}
                                    alt={item.title || ''}
                                /> :
                                <div style={{ width: 80, height: 80 }}>

                                </div>
                            }
                            {canDelete && <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image style={{ cursor: 'pointer' }} src="/imgs/delete.svg" alt="" width={32} height={32}
                                    onClick={(e) => { e.stopPropagation(); handleDeleteArticle(item.id) }} />
                            </div>}
                        </div>


                    </div>
                );
            })}
        </div>
    );
}
