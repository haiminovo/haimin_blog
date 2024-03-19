import style from './edit.module.scss';
import { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, UploadFile, UploadProps, message } from 'antd';
import Layout from '@/components/layout';
import { Tags } from '@/components/tags';
import UploadImage from './components/uploadImage';
import dynamic from 'next/dynamic';
import { getCategoryList } from '@/api/category';
import { DefaultOptionType } from 'antd/es/select';
import { createArticle } from '@/api/article';
import siteConfig from '@/configs/siteConfig';
const ReactQuillEditor = dynamic(import('@/components/quillEditor'), { ssr: false });

export default function EditPage() {
    const [form] = Form.useForm();
    const [categoryList, setCategoryList] = useState<DefaultOptionType[] | undefined>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleClickSubmit = async () => {
        console.log('////////////');

        console.log(form.getFieldValue('img_url'));
        const res = await createArticle({ admin_id: 'haimin', ...form.getFieldsValue() });
        if (res?.code === 200) {
            message.success({
                content: '文章发布成功',
                duration: 2,
            });
        }
    };

    const initPage = async () => {
        //  初始化分类列表
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

    const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(fileList);
        setFileList(newFileList);
    };

    useEffect(() => {
        initPage();
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
                    <Form.Item
                        label="封面"
                        name="img_url"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            return siteConfig.imgServerUrl + e?.fileList?.[0]?.response?.key;
                        }}
                    >
                        <UploadImage value={fileList} onChange={handleUploadChange} maxCount={1}></UploadImage>
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
