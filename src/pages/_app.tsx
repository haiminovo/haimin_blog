import '@/styles/common.scss';
import '@/styles/globals.scss';
// 引入富文本编辑器的样式文件
// react-quill 富文本依赖样式
import 'react-quill/dist/quill.snow.css';


export default function MyApp({ Component, pageProps }: any) {
    return <Component {...pageProps} />;
}
