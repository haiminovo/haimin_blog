import React from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import Link from 'next/link';
import siteData from '@/data/siteData';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/config/siteConfig';
import { useRouter } from 'next/router';

interface IHeaderProps {
    className?: string;
}

export default function Header({ className = '' }: IHeaderProps) {
    const router = useRouter();
    const route = [
        {
            name: '首页',
            link: '/',
        },
        {
            name: '文章',
            link: '/artical',
        },
        {
            name: '我的',
            link: '/my',
        },
    ];
    return (
        <div className={classNames(style.header, className)}>
            <div className={style.header__title}>
                <Image
                    className={style.header__icon}
                    width={32}
                    height={32}
                    alt="haimin"
                    src={siteConfig.imgServer + 'haimin.jpg'}
                    onClick={() => router.push('/')}
                />
                <div className={style.header__text}>{siteData.name}</div>
            </div>

            <div className={style.header__links}>
                {route.map((item, index) => {
                    return (
                        <Link key={index} className={style.header__link} href={item.link}>
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
