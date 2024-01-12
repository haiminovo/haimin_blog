
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import style from './index.module.scss';
import siteData from '@/data/siteData';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/configs/siteConfig';
import RouterLink from '@/components/routerLink';
import { routers } from '@/data/routers';
import { Layout, Modal } from 'antd';
import { useSelector } from 'react-redux';
import loginSlice, { LoginState, setShowLogin } from '@/store/slices/loginSlice';
import { AppState, store } from '@/store';

const AntHeader = Layout.Header;

interface IHeaderProps {
    className?: string;
}

export default function Header({ className = '' }: IHeaderProps) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    let aaaa = useSelector((state: AppState) => {
        console.log(state.login.showLogin);
        return state.login.showLogin;
    });

    useEffect(() => {
        setShowLoginModal(aaaa);
    }, [aaaa]);

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
                {/* <div>
                    <Modal
                        open={true}
                        onCancel={() => {
                            store.dispatch(setShowLogin(false));
                        }}
                    ></Modal>
                </div> */}
                <RouterLink routers={routers} />
            </AntHeader>
        </>
    );
}
