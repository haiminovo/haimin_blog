import style from './index.module.scss';
import { Alert, Checkbox, CheckboxProps, Form, Input, Modal, Tabs } from 'antd';
import { AppState, store } from '@/store';
import { setIsLogged, setShowLogin } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { userLogin, userRegister } from '@/api/user';
import { adminLogin, adminRegister } from '@/api/admin';

export default function LoginModal() {
    const [type, setType] = useState('登录');
    let showModal = useSelector((state: AppState) => {
        return state.login.showLogin;
    });

    const [form] = Form.useForm();
    const [isAdmin, setIsAdmin] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [fetchDone, setFetchDone] = useState<boolean | undefined>(undefined);
    const [loginError, setLoginError] = useState<string | undefined>(undefined);

    const handleIsAdminChange: CheckboxProps['onChange'] = (e) => {
        setIsAdmin(e.target.checked);
    };

    const handleModalSubmit = async () => {
        setButtonLoading(true);
        const formValue = form.getFieldsValue();
        const loginFunc = isAdmin ? adminLogin : userLogin;
        const registerFunc = isAdmin ? adminRegister : userRegister;
        const request = type === '登录' ? loginFunc(formValue) : registerFunc(formValue);
        const res = await request;
        if (res?.code === 200) {
            // redux派发已登录状态
            store.dispatch(setIsLogged(true));
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
        else {
            setLoginError(res?.msg[0])
            setButtonLoading(false)
        }
        setFetchDone(true);
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
            <Checkbox onChange={handleIsAdminChange}>管理员</Checkbox>
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
            <Form.Item name="nickname" rules={[{ required: true, message: '' }]} initialValue={null}>
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
            <Checkbox onChange={handleIsAdminChange}>记住我</Checkbox>
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
