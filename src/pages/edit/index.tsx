import ReactQuillEditor from '@/components/quillEditor';
import style from './edit.module.scss';
import { useState } from 'react';
import { debounce } from 'lodash';
import { Button, Form, Input } from 'antd';
import Layout from '@/components/layout';

export default function EditPage() {
    const [value, setValue] = useState('');
    // 剩下参数 delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor

    const handleChangeValue = (value: string) => {
        setValue(value);
        console.log(value);
    };

    const handleClickSubmit = () => {
        fetch('127.0.0.1:5000/api/v1/article', {
            method: 'post',
            body: JSON.stringify({}),
        }).then((res) => {
            console.log(res);
        });
    };

    return (
        <Layout>
            <div className={style.edit}>
                <Form className={style.edit__form}>
                    <Input placeholder="文章标题" />
                    <Input placeholder="Basic usage" />
                    <ReactQuillEditor
                        className={style.form__quillEditor}
                        value={value}
                        onChange={debounce(handleChangeValue, 500)}
                    ></ReactQuillEditor>
                    <div className={style.form__buttonGroup}>
                        <Button type="default" onClick={handleClickSubmit}>
                            Primary Button
                        </Button>
                        <Button type="primary">Primary Button</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
}
