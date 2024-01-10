import React, { useState } from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import siteData from '@/data/siteData';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/configs/siteConfig';
import RouterLink from '@/components/routerLink';
import { routers } from '@/data/routers';

interface IHeaderProps {
    className?: string;
}

export default function Header({ className = '' }: IHeaderProps) {
    return (
        <div className={classNames(style.header, className)}>
            <div className={style.header__title}>
                <Image
                    className={style.header__icon}
                    width={32}
                    height={32}
                    alt="haimin"
                    src={siteConfig.imgServer + 'haimin.jpg'}
                />
                <div className={style.header__text}>{siteData.name}</div>
            </div>
            <RouterLink routers={routers}/>
        </div>
    );
}
