import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import style from './index.module.scss';
interface ISiderProps {
    children?: React.ReactNode;
    className?: string;
}

const AntSider = Layout.Sider;
export default function Sider({ children }: ISiderProps) {
    return <AntSider className={style.sider}>{children}</AntSider>;
}
