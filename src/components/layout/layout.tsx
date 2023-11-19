import style from './index.module.scss';
import Footer from '@/components/footer';
import Content from '@/components/content';
import Header from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.layout}>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </div>
    );
}
