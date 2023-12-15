import React from 'react';
import style from './index.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/commonUtils';
import siteConfig from '@/config/siteConfig';

interface IFooterProps {
    className?: string;
}

export default function Footer({ className = '' }: IFooterProps) {
    return (
        <>
            <div className={classNames(style.footer, className)}>
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
                            style={{ marginRight: '4px' }}
                            alt="浙公网安备33010502007246号"
                            src={siteConfig.imgServer + '备案图标.png'}
                            unoptimized
                        />
                        浙公网安备33010502007246号
                    </a>
                    <a className={style.footer__link} target="_blank" href="https://beian.miit.gov.cn">
                        浙ICP备2021034756号
                    </a>
                </div>
            </div>
        </>
    );
}
