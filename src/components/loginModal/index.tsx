import style from './index.module.scss';
import { Checkbox, Form, Input, Modal } from 'antd';
import { AppState, store } from '@/store';
import { setShowLogin } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';
import { adminLogin } from '@/api/admin';

export default function LoginModal() {
    let showModal = useSelector((state: AppState) => {
        return state.login.showLogin;
    });

    const [form] = Form.useForm();

    return (
        <Modal
            className={style.LoginModal}
            open={showModal}
            onCancel={() => {
                store.dispatch(setShowLogin(false));
            }}
            onOk={async ()=>{
                console.log('params',form.getFieldsValue());
                const res=await adminLogin(form.getFieldsValue())
                console.log(res);
                
            }}
        >
            <Form name='login' form={form}>
                <h2>登录</h2>
                <Form.Item label="邮箱" name="email">
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input placeholder='请输入密码'/>
                </Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item> */}
            </Form>
        </Modal>
    );
}
