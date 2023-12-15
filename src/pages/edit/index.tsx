import Layout from '@/components/layout/layout';
import ReactQuillEditor from '@/components/quillEditor';
import style from './edit.module.scss';

export default function EditPage() {


    return (
        <Layout>
            <ReactQuillEditor className={style.edit}></ReactQuillEditor>
        </Layout>
    );
}
