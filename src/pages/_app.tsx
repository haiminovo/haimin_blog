import { store } from '@/store';
import '@/styles/common.scss';
import '@/styles/globals.scss';
// 引入富文本编辑器的样式文件
// react-quill 富文本依赖样式
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';


export default function MyApp({ Component, pageProps }: any) {

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
