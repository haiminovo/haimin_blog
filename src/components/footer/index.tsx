import React from 'react';
import style from './index.module.scss';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.footer__cutLine} />
            <div className={style.footer__links}>
                <a
                    className={style.footer__link}
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502007246"
                >
                    <Image
                        width={16}
                        height={16}
                        style={{paddingRight:'4px'}}
                        alt="浙公网安备33010502007246号"
                        src="http://haiminovo.cn:8088/备案图标.png"
                        unoptimized
                    />
                    浙公网安备33010502007246号
                </a>
                <a className={style.footer__link} target="_blank" href="https://beian.miit.gov.cn">
                    浙ICP备2021034756号
                </a>
            </div>
        </div>
    );
}
