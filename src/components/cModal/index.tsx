import { Modal, Form } from 'antd';
import store from '@/store';

export default function CModal() {
    const showLoginModal = store.getState().login.showLogin;
    return (
        <Modal title="登录" open={showLoginModal}>
            <Form></Form>
        </Modal>
    );
}
