import React, { useState } from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import Link from 'next/link';
import siteData from '@/data/siteData';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/config/siteConfig';
import { useRouter } from 'next/router';
import { Form, Modal } from 'antd';

interface IHeaderProps {
    className?: string;
}

export default function Header({ className = '' }: IHeaderProps) {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
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
            name: '创作',
            link: '/edit',
        },
        {
            name: '我的',
            link: '/my',
        },
        {
            name: '登录',
            link: '',
            onclick: () => {
                setShowLoginModal(true);
            },
        },
    ];
    const handleOk = () => {
        setShowLoginModal(false);
    };

    const handleCancel = () => {
        setShowLoginModal(false);
    };
    return (
        <div className={classNames(style.header, className)}>
            <Modal title="登录" open={showLoginModal} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    
                </Form>
            </Modal>
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
                        <Link key={index} className={style.header__link} href={item.link} onClick={item.onclick}>
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
