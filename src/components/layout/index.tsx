import style from './index.module.scss';
import Footer from '@/components/layout/components/footer';
import Content from '@/components/layout/components/content';
import Header from '@/components/layout/components/header';

import { Layout as AntLayout, Modal } from 'antd';
import { AppState, store } from '@/store';
import { setShowLogin } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
    let showModal = useSelector((state: AppState) => {
        return state.login.showLogin;
    });

    return (
        <div>
            <Modal
                open={showModal}
                onCancel={() => {
                    store.dispatch(setShowLogin(false));
                    console.log(showModal);
                }}
            >
                <div>loginModal</div>
            </Modal>
            <AntLayout className={style.layout}>
                <Header className={style.layout__header} />
                <Content className={style.layout__content}>{children}</Content>
                <Footer className={style.layout__footer} />
            </AntLayout>
        </div>
    );
}
