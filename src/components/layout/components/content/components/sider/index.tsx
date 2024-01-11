import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import { createStyles } from 'antd-style';

interface ISiderProps {
    children?: React.ReactNode;
    className?: string;
}
const useStyles = createStyles({
    sider123: {
        background:'#FFF',
    },
});
const AntSider = Layout.Sider;
export default function Sider({ children }: ISiderProps) {
    const { styles } = useStyles();
    return <AntSider className={styles.sider123}>{children}</AntSider>;
}
