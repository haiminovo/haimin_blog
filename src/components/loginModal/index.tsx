import style from './index.module.scss';
import { Checkbox, Form, Input, Modal } from 'antd';
import { AppState, store } from '@/store';
import { setShowLogin } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';

export default function LoginModal() {
    let showModal = useSelector((state: AppState) => {
        return state.login.showLogin;
    });

    return (
        <Modal
            className={style.LoginModal}
            open={showModal}
            onCancel={() => {
                store.dispatch(setShowLogin(false));
            }}
        >
            <Form name='login'>
                <h1>登录</h1>
                <Form.Item label="账号" name="username">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input placeholder='请输入密码'/>
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}
