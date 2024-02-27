import style from './index.module.scss';
import Footer from '@/components/layout/components/footer';
import Content from '@/components/layout/components/content';
import Header from '@/components/layout/components/header';

import { Layout as AntLayout } from 'antd';
import LoginModal from '../loginModal';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LoginModal></LoginModal>
            <AntLayout className={style.layout}>
                <Header className={style.layout__header} />
                <Content className={style.layout__content}>
                    <div className={style.content__children}>{children}</div>
                </Content>
            </AntLayout>
        </>
    );
}
