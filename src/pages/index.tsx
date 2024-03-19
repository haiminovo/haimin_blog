import Layout from '@/components/layout';
import LineBallCanvas from '@/components/lineBallCanvas';
import { Carousel } from 'antd';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

export default function Home() {
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const onChange = (currentSlide: number) => {};

    const scrollBox = useRef<any>();
    const handleLastMidItemHover = (current: any) => {
        const range = current.target.offsetLeft - 640;
        console.log(range);
        scrollBox.current.scrollTo({
            left: range,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        setCategoryList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }, []);
    return (
        <Layout>
            <div className={style.main}>
                {/* <LineBallCanvas></LineBallCanvas> */}
                <div className={style.main__top}>
                    <Carousel className={style.cards} autoplay afterChange={onChange}>
                        <div>
                            <h3 className={style.card}>1</h3>
                        </div>
                        <div>
                            <h3 className={style.card}>2</h3>
                        </div>
                        <div>
                            <h3 className={style.card}>3</h3>
                        </div>
                    </Carousel>
                </div>
                <div className={style.main__mid}>
                    <div className={style.box} ref={scrollBox}>
                        {categoryList.map((_item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={style.item}
                                    onMouseEnter={debounce((current) => handleLastMidItemHover(current),500)}
                                >
                                    {_item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
