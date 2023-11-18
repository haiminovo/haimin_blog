import React from 'react';
import style from './index.module.scss';
import LineBallCanvas from './components/lineBallCanvas';
import { classNames } from '@/utils/commonUtils';
import SideBar from '../../../sideBar';

interface IContentProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Content({ children, className = '' }: IContentProps) {
    return (
        <>
            {/* <LineBallCanvas></LineBallCanvas> */}
            <div className={classNames(style.content, className)}>
                <SideBar></SideBar>
                <div className={style.content__children}>{children}</div>
                <SideBar></SideBar>
            </div>
        </>
    );
}
