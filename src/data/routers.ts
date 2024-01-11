import { store } from "@/store";
import { showLogin } from "@/store/slices/loginSlice";
import { Url } from "next/dist/shared/lib/router/router";
export interface IRouter {
    name: string;
    link: Url;
    onClick?:()=>void;
}

export const routers: IRouter[] = [
    {
        name: '首页',
        link: '/',
    },
    {
        name: '文章',
        link: '/artical',
    },
    {
        name: '创作',
        link: '/edit',
    },
    {
        name: '我的',
        link: '/my',
    },
    {
        name: '登录',
        link: '',
        onClick:()=>{store.dispatch(showLogin());}
    },
];
