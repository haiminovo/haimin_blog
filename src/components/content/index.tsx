import React from 'react';
import style from './index.module.scss';

interface IContentProps {
    children?: React.ReactNode;
}
export default function Content({ children }: IContentProps) {
    return (
        <div className={style.content}>
            content
            {children}
        </div>
    );
}
