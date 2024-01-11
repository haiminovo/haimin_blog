import style from './index.module.scss';
import Footer from '@/components/layout/components/footer';
import Content from '@/components/layout/components/content';
import Header from '@/components/layout/components/header';

import { Layout as AntLayout, Modal } from 'antd';

import { store } from '@/store';
import { unShowLogin } from '@/store/slices/loginSlice';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const showLoginModal = store.getState().login.isShowLogin;
    const [showModel, setShowModel] = useState(showLoginModal);

    useEffect(() => {
        setShowModel(showLoginModal);
    }, [showLoginModal]);
    return (
        <>
            <AntLayout className={style.layout}>
                <Header className={style.layout__header} />
                <Content className={style.layout__content}>{children}</Content>
                <Footer className={style.layout__footer} />
            </AntLayout>
            <Modal
                open={showModel}
                onCancel={() => {
                    console.log(store.getState().login.isShowLogin);

                    store.dispatch(unShowLogin());
                    setShowModel(false);
                }}
            ></Modal>
        </>
    );
}
