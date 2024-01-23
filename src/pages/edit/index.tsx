import style from './edit.module.scss';
import { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, message } from 'antd';
import Layout from '@/components/layout';
import { Tags } from '@/components/tags';
import UploadImage from './components/uploadImage';
import dynamic from 'next/dynamic';
import { getCategoryList } from '@/api/category';
import { DefaultOptionType } from 'antd/es/select';
import { createArticle } from '@/api/article';
const ReactQuillEditor = dynamic(import('@/components/quillEditor'), { ssr: false });

export default function EditPage() {
    const [form] = Form.useForm();
    const [categoryList, setCategoryList] = useState<DefaultOptionType[] | undefined>([]);

    const handleClickSubmit = async () => {
        form.setFieldValue('img_url', 'http://haiminovo.cn:8088/article.svg');
        const res = await createArticle({ admin_id: 'haimin', ...form.getFieldsValue() });
        if (res.code === 200) {
            message.success({
                content: '文章发布成功',
                duration: 2,
            });
        }
    };

    const initCategoryList = async () => {
        const categoryListRes = await getCategoryList();
        setCategoryList(
            categoryListRes.data.data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.name,
                    children: [],
                };
            })
        );
    };

    const handleTagChange = (tags: string[]) => {
        form.setFieldValue('seo_keyword', tags.join(',') || ' ');
    };

    useEffect(() => {
        initCategoryList();
    }, []);

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
                        <Tags onChange={handleTagChange}></Tags>
                    </Form.Item>
                    <Form.Item label="内容" name="content">
                        <ReactQuillEditor className={style.form__quillEditor}></ReactQuillEditor>
                    </Form.Item>
                    <Form.Item label="封面" name="img_url">
                        <UploadImage></UploadImage>
                    </Form.Item>
                    <Form.Item
                        label="分类"
                        name="category_id"
                        normalize={(value: string[]) => {
                            return value[0];
                        }}
                    >
                        <Cascader options={categoryList} placeholder="Please select" placement="bottomRight" />
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
