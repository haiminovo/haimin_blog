import style from './index.module.scss';
import Footer from '@/components/layout/components/footer';
import Content from '@/components/layout/components/content';
import Header from '@/components/layout/components/header';

import { Layout as AntLayout, Modal } from 'antd';

import { setShowLogin } from '@/store/slices/loginSlice';
import { useEffect, useState } from 'react';
import { store } from '@/store';

export default function Layout({ children }: { children: React.ReactNode }) {
    let showLoginModal = store.getState().login.isShowLogin;
    const [showModal, setShowModal] = useState(showLoginModal);

    useEffect(() => {
        setShowModal(showLoginModal);
    }, [showLoginModal]);
    return (
        <AntLayout className={style.layout}>
            <Header className={style.layout__header} />
            <Content className={style.layout__content}>{children}</Content>
            <Footer className={style.layout__footer} />
        </AntLayout>
    );
}
