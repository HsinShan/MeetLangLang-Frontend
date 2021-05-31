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
import moment from 'moment';
import xss from 'xss';
import '../../assets/style/discuss/detail.scss';
import ResponseList from '../../components/response/responseList';

// use api
const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const xssProtect = (html) => {
    const newhtml = new xss.FilterXSS({
        whiteList: {
            // Link
            a: ['href'],
            // Title
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            // List
            ul: [],
            ol: [],
            li: [],
            // Table
            table: [],
            tr: [],
            td: [],
            th: [],
            // Text
            b: [],
            em: [],
            u: [],
            p: [],
            // Image
            img: ['src', 'height', 'width'],
            // New line
            br: [],
        },
    });
    return newhtml.process(html);
};

const DiscussDetail = ({ isLogin }) => {
    const { t } = useTranslation();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const uuidFromURL = params.get('uuid');
    const [discuss, setDiscuss] = useState(null);
    const [response, setResponse] = useState(null);
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
    const getResponse = async () => {
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/response/${uuidFromURL}`)
            .then((res) => {
                const { data } = res;
                setResponse(data);
            });
    };
    useEffect(() => {
        if (uuidFromURL && discuss === null) {
            getData();
            getResponse();
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
                    setIsResponsing(false);
                    getResponse();
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
                    <div>
                        <Card title={discuss.title}>
                            <p className="author">{t('discuss.author')}：{discuss.author}</p>
                            <p className="date">{t('discuss.date')}：{moment(discuss.date).format('YYYY-MM-DD')}</p>
                            <div className="content" dangerouslySetInnerHTML={{ __html: xssProtect(discuss.content) }}></div>
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
                        {response !== null &&
                            <ResponseList data={response} />
                        }
                    </div>
                }
                {discuss !== null && !isResponsing &&
                    <div>
                        <Card title={discuss.title}>
                            <p className="author">{t('discuss.author')}：{discuss.author}</p>
                            <p className="date">{t('discuss.date')}：{moment(discuss.date).format('YYYY-MM-DD')}</p>
                            <div className="content" dangerouslySetInnerHTML={{ __html: xssProtect(discuss.content) }}></div>
                            <Button className='button-add-response' onClick={() => { setIsResponsing(true); }}>{t('discuss.add-response')}</Button>
                        </Card>
                        {response !== null &&
                            <ResponseList data={response} />
                        }
                    </div>
                }
                {discuss === null && <div><Spin tip="Loading..." /></div>}
            </div>
        </>
    );
};

export default DiscussDetail;
