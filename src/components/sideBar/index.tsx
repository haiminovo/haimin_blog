import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '@/utils/commonUtils';
import style from './index.module.scss';

interface ISideBarProps {
    children?: React.ReactNode;
    className?: string;
}

export default function SideBar({ children, className = '' }: ISideBarProps) {
    return <div className={classNames(style.sideBar, className)}>{children}</div>;
}
