import '@/styles/common.scss';
import '@/styles/globals.scss';
import { ConfigProvider, theme } from 'antd';
// 引入富文本编辑器的样式文件
// react-quill 富文本依赖样式
import 'react-quill/dist/quill.snow.css';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    // Seed Token，影响范围大
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    // 派生变量，影响范围小
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
