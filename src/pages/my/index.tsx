import style from './my.module.scss';
import { getUserDetail } from '@/api/user';
import Layout from '@/components/layout';
import { getLocal } from '@/utils/commonUtils';
import { init } from 'next/dist/compiled/webpack/webpack';
import { useEffect } from 'react';
import Image from 'next/image';
import siteConfig from '@/configs/siteConfig';

export default function MyPage() {
    const { id, email, nickname, isAdmin } = getLocal('userInf');
    return (
        <Layout>
            <div className={style.my}>
                <div className={style.top}>
                    <Image width={128}
                        height={128}
                        alt="haimin"
                        src={siteConfig.imgServer + 'haimin.jpg'} />
                    <div>
                        <p className={style.title}>欢迎你，{nickname} <a className={style.btn}> 修改昵称</a></p>
                        <p className={style.title}>uid:{id} <a className={style.btn}> 复制</a></p>
                        <p className={style.title}>当前账号绑定邮箱：{email} <a className={style.btn}> 换绑</a></p>
                    </div>
                </div>


                <div className={style.inf}>
                    <div className={style.box}>
                        累计获赞：{49}
                    </div>
                    <div className={style.box}>
                        发布文章数：{2}
                    </div>
                    <div className={style.box}>
                        发布评论数：{1}
                    </div>
                    <div className={style.box}>
                        曝光数：{156}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
