import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';

const AntSider = Layout.Sider;
export default function Sider({ children }: { children?: React.ReactNode }) {
    return <AntSider>{children}</AntSider>;
}
