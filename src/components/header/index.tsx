import React from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import Link from 'next/link';

export default function Header() {
    const route = [
        {
            name: 'artical',
            link: '/artical',
        },
        {
            name: 'artical',
            link: '/artical',
        },
        {
            name: 'artical',
            link: '/artical',
        },
        {
            name: 'artical',
            link: '/artical',
        },
        {
            name: 'artical',
            link: '/artical',
        },
    ];
    return (
        <div className={style.header}>
            <Image
                className={style.header__icon}
                width={32}
                height={32}
                alt="haimin"
                src="http://haiminovo.cn:8088/haimin.jpg"
            />
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
