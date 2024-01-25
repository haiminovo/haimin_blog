import style from './index.module.scss';
import { Alert, Checkbox, CheckboxProps, Form, Input, Modal, Tabs } from 'antd';
import { AppState, store } from '@/store';
import { setShowLogin } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { userLogin, userRegister } from '@/api/user';

export default function LoginModal() {
    const [type, setType] = useState('登录');
    let showModal = useSelector((state: AppState) => {
        return state.login.showLogin;
    });

    const [form] = Form.useForm();
    const [rememberMe, setRemeberMe] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [fetchDone, setFetchDone] = useState<boolean | undefined>(undefined);
    const [loginError, setLoginError] = useState<string | undefined>(undefined);
    const handleRemeberMeChange: CheckboxProps['onChange'] = (e) => {
        setRemeberMe(e.target.value);
    };

    const handleModalSubmit = async () => {
        setButtonLoading(true);
        const formValue = form.getFieldsValue();
        const res = await (type==='登录'?userLogin(formValue):userRegister(formValue));
        if (res) {
            setFetchDone(true);
            setButtonLoading(false);
            if (res.errorCode === 0) {
                setLoginError(undefined);
                setTimeout(() => {
                    store.dispatch(setShowLogin(false));
                }, 200);
            } else {
                setLoginError(res.msg?.toLocaleString());
            }
        }
    };

    const onTabChange = (key: string) => {
        setType(key);
    };

    const loginForm = (
        <Form className={style.LoginModal__form} name="login" form={form} validateTrigger="onBlur">
            <Form.Item name="email" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请输入邮箱" allowClear />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请输入密码" allowClear />
            </Form.Item>
            <Checkbox onChange={handleRemeberMeChange}>记住我</Checkbox>
            {fetchDone ? (
                loginError ? (
                    <Alert className={style.form__alert} message={loginError} type="error" showIcon />
                ) : (
                    <Alert className={style.form__alert} message="登陆成功" type="success" showIcon />
                )
            ) : null}
        </Form>
    );

    const registerForm = (
        <Form className={style.LoginModal__form} name="login" form={form} validateTrigger="onBlur">
            <Form.Item name="username" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请输入用户名" allowClear />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请输入邮箱" allowClear />
            </Form.Item>
            <Form.Item name="password1" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请输入密码" allowClear />
            </Form.Item>
            <Form.Item name="password2" rules={[{ required: true, message: '' }]} initialValue={null}>
                <Input placeholder="请重复密码" allowClear />
            </Form.Item>
            <Checkbox onChange={handleRemeberMeChange}>记住我</Checkbox>
            {fetchDone ? (
                loginError ? (
                    <Alert className={style.form__alert} message={loginError} type="error" showIcon />
                ) : (
                    <Alert className={style.form__alert} message="注册成功" type="success" showIcon />
                )
            ) : null}
        </Form>
    );

    return (
        <Modal
            className={style.LoginModal}
            open={showModal}
            mask={false}
            cancelText={'取消'}
            onCancel={() => {
                store.dispatch(setShowLogin(false));
            }}
            okText={'登录'}
            confirmLoading={buttonLoading}
            onOk={handleModalSubmit}
        >
            <Tabs
                onChange={onTabChange}
                size="large"
                animated
                items={[
                    {
                        label: `登录`,
                        key: '登录',
                        children: loginForm,
                    },
                    {
                        label: `注册`,
                        key: '注册',
                        children: registerForm,
                    },
                ]}
            />
        </Modal>
    );
}
