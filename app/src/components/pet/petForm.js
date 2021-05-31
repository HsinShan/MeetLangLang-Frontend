import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
    Form, Input, Upload, Button, Radio, Select, message,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import '../../assets/style/pet/petForm.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const PetForm = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [form] = Form.useForm();
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
    const submit = async (allvalues) => {
        const token = localStorage.getItem('token');
        const petName = allvalues.name;
        const petSex = allvalues.sex;
        const petAge = allvalues.age;
        const petKind = allvalues.kind;
        const petIntro = allvalues.introduction;
        const petPhoto = imageUrl;
        try {
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/pet`,
                headers: { token },
                data: {
                    petName,
                    petSex,
                    petAge,
                    petKind,
                    petIntro,
                    petPhoto,
                },
                method: 'post',
            });
            if (data.success) message.success(t('petadd.add-success'));
            history.push('/member');
        } catch (err) {
            if ('response' in err) {
                message.error(JSON.stringify(err.response.data));
            } else {
                message.error(err.toString());
            }
            console.log(err);
        }
    };
    return (
        <Form className="petform" form={form} autoComplete="off" onFinish={(values) => submit(values)}>
            <div className="pet-form">
                <div className="text-block">
                    <Form.Item className="pet-input" label={t('petadd.pet-name')} name="name" rules={[{ required: true, message: `${t('petadd.alert')}` }]}>
                        <Input onChange={onChange}/>
                    </Form.Item>
                    <Form.Item className="pet-input" label={t('petadd.pet-sex')} name="sex">
                        <div className="dropdown">
                            <Radio.Group>
                                <Radio value="F">{t('petadd.female')}</Radio>
                                <Radio value="M">{t('petadd.male')}</Radio>
                            </Radio.Group>
                        </div>
                    </Form.Item>
                    <Form.Item className="pet-input" label={t('petadd.pet-age')} name="age">
                        <div className="pet-input-age">
                            <Input type="number" min="0"></Input>
                            <label className="pet-input-age-unit">{t('petadd.pet-age-unit')}</label>
                        </div>
                    </Form.Item>
                    <Form.Item className="pet-input" label={t('petadd.pet-kind')} name="kind">
                        <Select>
                            <Select.Option value="狗">{t('petadd.dog')}</Select.Option>
                            <Select.Option value="貓">{t('petadd.cat')}</Select.Option>
                            <Select.Option value="其他">{t('petadd.other')}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="pet-input" label={t('petadd.pet-introduction')} name="introduction">
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                </div>
                <Upload className="avatar-uploader pet-image" listType="picture-card" action="https://api.imgur.com/3/image" showUploadList={false} customRequest={customRequest}>
                    {imageUrl ? <img src={`https://images.weserv.nl/?url=${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
            <div className="button">
                <Form.Item>
                    {information ? <Button className="click-button" type="Default" htmlType="submit">{t('petadd.add')}</Button> : <Button className="no-click-button" type="Default" disabled>{t('petadd.add')}</Button>}
                </Form.Item>
            </div>
        </Form>
    );
};

export default PetForm;
