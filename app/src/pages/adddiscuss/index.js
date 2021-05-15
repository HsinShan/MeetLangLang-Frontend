import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    Select,
    message,
    Form,
} from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../../assets/style/adddiscuss/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const AddDiscuss = ({ isLogin }) => {
    const { t } = useTranslation();
    const [redirect, setRedirect] = useState('');
    const [form] = Form.useForm();
    const submit = async (title, content) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/discuss/topic`,
                headers: { token },
                data: {
                    title,
                    content,
                },
                method: 'post',
            });
            if (data.success) message.success(t('post-success'));
            setRedirect('/discuss');
        } catch (err) {
            if ('response' in err) {
                const code = err.response.data.errorCode.toString();
                if (code[1] === '2') {
                    if (code[2] === '1' || code[2] === '3') {
                        message.error('field title is missing');
                    } else {
                        message.error('field content is missing');
                    }
                } else if (code[1] === '3') {
                    if (code[2] === 1) {
                        message.error('insert into Message table error');
                    } else if (code[2] === '2') {
                        message.error('get topics form Message table error');
                    } else {
                        message.error('get detail form Message table error');
                    }
                } else {
                    message.error('token error');
                }
            } else {
                message.error(err.toString());
            }
            console.log(err);
        }
    };
    const goback = () => setRedirect('/discuss');
    return (
        <div className="adddiscuss">
            {!isLogin &&
                <Redirect to="/" />
            }
            {redirect !== '' &&
                <Redirect to={redirect} />
            }
            <Form
                form={form}
                name="add-discuss"
                initialValues={{
                    title: '',
                    content: '',
                }}
                onFinish={(values) => submit(values.title, values.content)}
                labelCol={{ span: 3, offset: 3 }}
                wrapperCol={{ span: 15 }}
                validateMessages={{
                    required: '\'${label}\' is required!', // eslint-disable-line no-template-curly-in-string
                }}
            >
                <Form.Item
                    label={t('discuss.author')}
                >
                    {t('discuss.building')}
                </Form.Item>
                <Form.Item
                    label={t('discuss.title')}
                    name="title"
                    rules={[{ required: true, min: 1 }]}
                >
                    <Input placeholder={t('discuss.title-text')} />
                </Form.Item>
                <Form.Item
                    label={t('discuss.category')}
                    name="category"
                    wrapperCol={{ span: 5 }}
                >
                    <Select defaultValue="default" disabled>
                        <Select.Option value="default">{t('discuss.building')}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('discuss.content')}
                    name="content"
                    rules={[{ required: true, min: 1 }]}
                >
                    <Input.TextArea rows={4} placeholder={t('discuss.content-text')} />
                </Form.Item>
            </Form>
            <Row className="row-input bottom" justify="end">
                <Col className="col-buttons" span={18} pull={3}>
                    <Button type="primary" onClick={() => form.submit()}>{t('discuss.post')}</Button>
                    <Button type="primary" onClick={() => goback()}>{t('discuss.cancel')}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default AddDiscuss;
