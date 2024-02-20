import Link from 'next/link';
import style from './index.module.scss';
import { Url } from 'next/dist/shared/lib/router/router';
import { message, Popconfirm, Button } from 'antd';
import { AppState, store } from '@/store';
import { setIsLogged, setShowLogout } from '@/store/slices/loginSlice';
import { useSelector } from 'react-redux';

export interface IRouter {
    name: string;
    link: Url;
    onClick?: () => void;
}
interface IProps {
    routers: Array<IRouter | null>;
}
export default function RouterLink({ routers }: IProps) {
    const showLogout = useSelector((state: AppState) => {
        return state.login.showLogout;
    });

    const confirm = (e: any) => {
        store.dispatch(setIsLogged(false));
        store.dispatch(setShowLogout(false));
        localStorage.removeItem('userInf');
        message.success('登出成功!');
    };
    return (
        <div className={style.routerLink}>
            <div className={style.routerLink__links}>
                {routers.map((item, index) => {
                    return (
                        item && (
                            <Popconfirm
                                key={index}
                                title="提示"
                                description="确认登出?"
                                onConfirm={confirm}
                                okText="确认"
                                cancelText="取消"
                                disabled={item.name !== '登出'}
                            >
                                <Link className={style.routerLink__link} href={item.link} onClick={item.onClick}>
                                    {item.name}
                                </Link>
                            </Popconfirm>
                        )
                    );
                })}
            </div>
        </div>
    );
}
