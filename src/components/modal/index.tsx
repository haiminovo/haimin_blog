import { Modal as AntModal, Form } from 'antd';
import { store } from '@/store';

export default function Modal() {
    const showLoginModal = store.getState().login.isShowLogin;
    return (
        <AntModal title="登录" open={showLoginModal}>
            <Form></Form>
        </AntModal>
    );
}
