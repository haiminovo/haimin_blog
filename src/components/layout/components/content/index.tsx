import React from 'react';
import style from './index.module.scss';
import LineBallCanvas from './components/lineBallCanvas';

interface IContentProps {
    children?: React.ReactNode;
}

export default function Content({ children }: IContentProps) {
    return (
        <>
            <div className={style.content}>
                <LineBallCanvas></LineBallCanvas>
                {children}
            </div>
        </>
    );
}
