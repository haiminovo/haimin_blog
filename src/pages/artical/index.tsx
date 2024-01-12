import getArticalsMockData, { IArticalsData } from '@/data/mock/articalsMockData';
import style from './artical.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import siteConfig from '@/configs/siteConfig';
import Layout from '@/components/layout';

export default function ArticalsPage() {
    const [articalsData, setArticalsData] = useState<IArticalsData[]>([]);
    useEffect(() => {
        setArticalsData(getArticalsMockData(10));
    }, []);
    return (
        <Layout>
            <div className={style.articals}>
                {articalsData.map((item: IArticalsData) => {
                    return (
                        <div className={style.artical} key={item.id}>
                            <div className={style.articalBox}>
                                <div className={style.articalBox__main}>
                                    <div className={style.articalBox__title}>{item.title}</div>
                                    <div className={style.articalBox__summary}>{item.summary}</div>
                                    <div className={style.articalBox__infBox}>
                                        <div className={style.articalBox__inf}>
                                            <div>{item.author}</div>
                                            <div>{item.viewNum}</div>
                                            <div>{item.likeNum}</div>
                                        </div>
                                        <div className={style.articalBox__tags}>
                                            {item?.tags?.map((tag, index) => {
                                                return (
                                                    <span className={style.articalBox__tag} key={index}>
                                                        {tag}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <Image
                                    className={style.articalBox__img}
                                    width={80}
                                    height={80}
                                    src={siteConfig.imgServer + 'artical.svg'}
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
