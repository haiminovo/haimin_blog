import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import siteData from '@/data/siteData';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/configs/siteConfig';
import RouterLink, { IRouter } from '@/components/layout/components/header/components/routerLink';
import { Layout } from 'antd';
import { AppState } from '@/store';
import { useSelector } from 'react-redux';
const AntHeader = Layout.Header;

import { store } from '@/store';
import { setShowLogin, setShowLogout } from '@/store/slices/loginSlice';

interface IHeaderProps {
    className?: string;
}

export default function Header({ className = '' }: IHeaderProps) {
    const [router, setRouter] = useState<Array<IRouter | null>>([]);
    const isLogged = useSelector((state: AppState) => {
        return state.login.islogged;
    });

    useEffect(() => {
        const routers: Array<IRouter | null> = [
            {
                name: '首页',
                link: '/',
            },
            {
                name: '文章',
                link: '/article',
            },
            {
                name: '创作',
                link: '/edit',
            },
            {
                name: '我的',
                link: '/my',
            },
            isLogged
                ? {
                      name: '登出',
                      link: '',
                      onClick: () => {
                          store.dispatch(setShowLogout(true));
                      },
                  }
                : {
                      name: '登录',
                      link: '',
                      onClick: () => {
                          store.dispatch(setShowLogin(true));
                      },
                  },
        ];
        setRouter(routers);
    }, [isLogged]);

    return (
        <>
            <AntHeader className={classNames(style.header, className)}>
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
                <RouterLink routers={router} />
            </AntHeader>
        </>
    );
}
