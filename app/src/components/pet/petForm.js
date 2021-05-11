import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
    Form, Input, Upload, Button, Radio,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import '../../assets/style/pet/petForm.scss';

const PetForm = () => {
    const { t } = useTranslation();
    const { TextArea } = Input;
    const [information, setInformation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const uploadButton = (
        <>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </>
    );
    const customRequest = async (e) => {
        setLoading(true);
        const imgurForm = new FormData();
        imgurForm.append('image', e.file);
        const config = {
            headers: {
                Authorization: 'Client-ID 7250f9c19e46352',
            },
        };
        axios.post('https://api.imgur.com/3/image', imgurForm, config)
            .then((res) => {
                setImageUrl(res.data.data.link);
                setLoading(false);
            });
    };
    const onChange = (e) => {
        const { value } = e.target;
        if (value.length !== 0) {
            setInformation(true);
        }
        if (value.length === 0) {
            setInformation(null);
        }
    };
    const onFinish = (allvalues) => {
        console.log('Received values of form: ', allvalues);
    };
    return (
        <div className="pet-form">
            <Form onFinish={onFinish}>
                <Form.Item className="pet-input" label={t('petadd.pet-name')} name="name" rules={[{ required: true, message: 'Please input your petname!' }]}>
                    <Input onChange={onChange}/>
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-sex')} name="sex">
                    <Radio.Group>
                        <Radio value="F">{t('petadd.male')}</Radio>
                        <Radio value="M">{t('petadd.female')}</Radio>
                        <Radio value="null">{t('petadd.null')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-age')} name="age">
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-kind')} name="kind">
                    <Input />
                </Form.Item>
                <Form.Item className="pet-input" label={t('petadd.pet-introduction')} name="introduction">
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                </Form.Item>
                <Form.Item>
                    {information ? <Button type="Default" htmlType="submit">{t('petadd.add')}</Button> : <Button type="Default" disabled>{t('petadd.add')}</Button>}
                </Form.Item>
            </Form>
            <Upload className="avatar-uploader pet-image" listType="picture-card" action="https://api.imgur.com/3/image" showUploadList={false} customRequest={customRequest}>
                {imageUrl ? <img src={`https://images.weserv.nl/?url=${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    );
};

export default PetForm;
