import { store } from '@/store';
import '@/styles/common.scss';
import '@/styles/globals.scss';
// 引入富文本编辑器的样式文件
// react-quill 富文本依赖样式
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';

export default function MyApp({ Component, pageProps }: any) {
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
                    <Component {...pageProps} />
                </StyleProvider>
            </PersistGate>
        </Provider>
    );
}
