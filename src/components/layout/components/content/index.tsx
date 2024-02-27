import React from 'react';
import style from './index.module.scss';
import LineBallCanvas from '../../../lineBallCanvas';
import { classNames } from '@/utils/commonUtils';
import { Layout } from 'antd';
import Sider from './components/sider';
import Footer from '../footer';

const AntContent = Layout.Content;
const AntSider = Layout.Sider;
interface IContentProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Content({ children, className = '' }: IContentProps) {
    return (
        <Layout className={classNames(style.content, className)}>
            <Sider></Sider>
            <AntContent className={style.content__children}>{children}</AntContent>
            <Sider><Footer className={style.layout__footer} /></Sider>
        </Layout>
    );
}
