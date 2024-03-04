import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { getUploadToken } from '@/api/oss';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface IProps {
    value: UploadFile[];
    onChange: (info: UploadChangeParam<UploadFile>) => void;
    maxCount: number;
}

export default function UploadImage(props: IProps) {
    const { value, onChange, maxCount } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [uploadToken, setUploadToken] = useState();
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const initUpload = async () => {
        const res = await getUploadToken();
        setUploadToken(res?.data?.upload_token);
    };

    useEffect(() => {
        initUpload();
    }, []);

    return (
        <Upload
            action="http://upload-z0.qiniup.com"
            listType="picture-card"
            fileList={value}
            onPreview={handlePreview}
            onChange={onChange}
            maxCount={maxCount}
            data={{ token: uploadToken }}
        >
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {value?.length >= maxCount ? null : uploadButton}
        </Upload>
    );
}
