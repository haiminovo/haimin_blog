import style from './index.module.scss';
import Footer from '@/components/layout/components/footer';
import Content from '@/components/layout/components/content';
import Header from '@/components/layout/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.layout}>
            <Header className={style.layout__header} />
            <Content className={style.layout__content}>{children}</Content>
            <Footer className={style.layout__footer} />
        </div>
    );
}
