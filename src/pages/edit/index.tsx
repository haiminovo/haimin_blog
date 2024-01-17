import style from './edit.module.scss';
import { useState } from 'react';
import { debounce } from 'lodash';
import { Button, Cascader, Form, Input } from 'antd';
import Layout from '@/components/layout';
import Tags from '@/components/tags';
import UploadImage from './components/uploadImage';
import dynamic from 'next/dynamic';
const ReactQuillEditor = dynamic(import('@/components/quillEditor'), { ssr: false });

export default function EditPage() {
    const [form] = Form.useForm();
    // 剩下参数 delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor

    interface Option {
        value: string;
        label: string;
        children?: Option[];
    }

    

    const options: Option[] = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];
    const handleClickSubmit = () => {
        console.log(form.getFieldsValue());
    };

    return (
        <Layout>
            <div className={style.edit}>
                <Form form={form} className={style.edit__form}>
                    <Form.Item label="标题" name="title">
                        <Input placeholder="文章标题" />
                    </Form.Item>
                    <Form.Item label="简介" name="description">
                        <Input placeholder="文章简介" />
                    </Form.Item>
                    <Form.Item label="标签" name="seo_keyword">
                        <Tags></Tags>
                    </Form.Item>
                    <Form.Item label="内容" name="content">
                        {typeof window !== 'undefined' && (
                            <ReactQuillEditor
                                className={style.form__quillEditor}
                            ></ReactQuillEditor>
                        )}
                    </Form.Item>
                    <Form.Item label="封面" name="cover">
                        <UploadImage></UploadImage>
                    </Form.Item>
                    <Form.Item label="分类" name="category_id">
                        <Cascader options={options} placeholder="Please select" placement="bottomRight" />
                    </Form.Item>
                    <div className={style.form__buttonGroup}>
                        <Button type="default">暂存</Button>
                        <Button type="primary" onClick={handleClickSubmit}>
                            发布
                        </Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
}
