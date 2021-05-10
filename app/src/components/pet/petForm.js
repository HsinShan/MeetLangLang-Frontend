import { useTranslation } from 'react-i18next';
import axios from 'axios';
// import { VerticalAlignTopOutlined } from '@ant-design/icons';
import {
    Form, Input, Upload,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
// import { UploadOutlined } from '@ant-design/icons';
import '../../assets/style/pet/petForm.scss';
import { useState } from 'react';

const PetForm = () => {
    const { t } = useTranslation();
    // const [selectFile, setSelectFile] = setState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const uploadButton = (
        <>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </>
    );
    function getBase64(img, callback) {
        console.log('start');
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        console.log(reader.readAsDataURL(img));
        return reader.readAsDataURL(img);
    }
    const handleChange = (info) => {
        console.log('info', info);
        // if (info.file.thumbUrl) {
        //     setLoading(true);
        //     setImageUrl(info.file.thumbUrl);
        //     setLoading(false);
        // }
        if (info.file.status === 'uploading') {
            return setLoading(true);
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            // console.log(getBase64(info.file.originFileObj));
            // const url = getBase64(info.file.originFileObj);
            // setImageUrl(url);
            getBase64(info.file.originFileObj, (imgUrl) => {
                console.log(imgUrl);
                setImageUrl(imgUrl);
                setLoading(false);
            });
        }
        return null;
    };
    const customRequest = async (e) => {
        console.log(e);
        const { file } = e;
        axios.post('https://api.imgur.com/3/image', {
            image: file.name,
        },
        {
            headers: {
                Authorization: 'Client-ID 7250f9c19e46352',
                // 'x-post-rate-limit-limit': [1250],
                // 'x-post-rate-limit-remaining': [1250],
                // 'x-post-rate-limit-reset': [-2],
                // 'x-ratelimit-clientlimit': [12500],
                // 'x-ratelimit-clientremaining': [12499],
                // 'x-ratelimit-userlimit': [500],
                // 'x-ratelimit-userremaining': [499],
                // 'x-ratelimit-userreset': [1620619870],
            },
        });
    };
    /*
    const fileSelectHandler = (event) => {
        setSelectFile(event.target.files[0]);
        console.log('fileSelect');
        console.log(event);
        console.log(event.target.files[0]);
    };
    const fileUploadHandler = () => {

    };
    */
    return (
        <div className="pet-form">
            <Form>
                <Form.Item className="pet-input" label={t('petadd.pet-name')}>
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-sex')}>
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-age')}>
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-kind')}>
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-introduction')}>
                    <Input />
                </Form.Item>
            </Form>
            {/* <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}
            {/* <input type="file" onChange={fileSelectHandler} />
            <Button onclick={() => fileUploadHandler} shape="circle" icon={<VerticalAlignTopOutlined />}/> */}
            {/* <button onclick={() => fileUploadHandler} shape="circle" icon={<VerticalAlignTopOutlined />}></button> */}
            <Upload className="avatar-uploader pet-image" listType="picture-card" action="https://api.imgur.com/3/image" customRequest={customRequest} onChange={handleChange}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    );
};

export default PetForm;
