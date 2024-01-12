import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './index.module.scss';
import { IRouter } from '@/data/routers';

interface IProps{
    routers:IRouter[];
}
export default function RouterLink({routers}:IProps) {
    const router = useRouter();
    return (
        <div className={style.routerLink}>
            <div className={style.routerLink__links}>
                {routers.map((item, index) => {
                    return (
                        <Link key={index} className={style.routerLink__link} href={item.link} onClick={item.onClick}>
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
