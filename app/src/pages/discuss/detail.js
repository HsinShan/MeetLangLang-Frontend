import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Card,
    Spin,
    message,
    Input,
} from 'antd';
import { useTranslation } from 'react-i18next';
import '../../assets/style/discuss/detail.scss';

// use api
const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function DiscussDetail({ isLogin }) {
    const { t } = useTranslation();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const uuidFromURL = params.get('uuid');
    const [discuss, setDiscuss] = useState(null);
    const [isResponsing, setIsResponsing] = useState(false);
    const [form] = Form.useForm();
    const { hostname } = window.location;
    const getData = async () => {
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/discuss/topic/detail/${uuidFromURL}`)
            .then((res) => {
                const { data } = res;
                setDiscuss(data[0]);
            });
    };
    useEffect(() => {
        if (uuidFromURL && discuss === null) {
            getData();
        }
    });
    const addResponseLogic = async (content) => {
        if (isLogin) {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios({
                    url: `${apiProtocol}://${hostname}:${apiPort}/response`,
                    method: 'post',
                    headers: { token },
                    data: {
                        mesgId: uuidFromURL,
                        content,
                    },
                });
                const { success } = data;
                if (success) {
                    message.success(t('discuss.response-success'));
                }
            } catch (err) {
                message.error(t('discuss.response-failed'));
            }
        } else {
            message.warning(t('discuss.not-login'));
        }
    };

    return (
        <>
            <div className="discuss">
                {discuss !== null && isResponsing &&
                    <Card title={discuss.title}>
                        <p className="author">{t('discuss.author')}：{discuss.author}</p>
                        <p className="date">{t('discuss.date')}：{discuss.date}</p>
                        <p className="contnet">{t('discuss.content')}：{discuss.content}</p>
                        <Card title={t('discuss.add-response')}>
                            <Form
                                form={form}
                                initialValues={{
                                    content: '',
                                }}
                                onFinish={(values) => addResponseLogic(values.content)}
                                validateMessages={{
                                    required: t('discuss.content-empty'),
                                }}
                            >
                                <Form.Item
                                    name="content"
                                    rules={[{ required: true, min: 1 }]}
                                >
                                    <Input.TextArea
                                        className='input-response'
                                        rows={4}
                                        placeholder={t('discuss.content-text-response')}
                                    />
                                </Form.Item>
                            </Form>
                            <div className='button-responsing'>
                                <Button onClick={() => form.submit()}>{t('discuss.response')}</Button>
                                <Button onClick={() => { setIsResponsing(false); }}>{t('discuss.cancel')}</Button>
                            </div>
                        </Card>
                    </Card>
                }
                {discuss !== null && !isResponsing &&
                    <Card title={discuss.title}>
                        <p className="author">{t('discuss.author')}：{discuss.author}</p>
                        <p className="date">{t('discuss.date')}：{discuss.date}</p>
                        <p className="contnet">{t('discuss.content')}：{discuss.content}</p>
                        <Button className='button-add-response' onClick={() => { setIsResponsing(true); }}>{t('discuss.add-response')}</Button>
                    </Card>
                }
                {discuss === null && <div><Spin tip="Loading..." /></div>}
            </div>
        </>
    );
}
export default DiscussDetail;
