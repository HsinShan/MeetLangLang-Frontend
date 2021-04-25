import { Link, Redirect } from 'react-router-dom';
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
import axios from 'axios';
import '../../assets/style/adddiscuss/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const AddDiscuss = ({ isLogin }) => {
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
            if (data.success) message.success('張貼成功!');
            setRedirect('/discuss');
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
                    label="作者"
                >
                    製作中...
                </Form.Item>
                <Form.Item
                    label="主題"
                    name="title"
                    rules={[{ required: true, min: 1 }]}
                >
                    <Input placeholder="大家都怎麼照顧幼犬的呢？" />
                </Form.Item>
                <Form.Item
                    label="類別"
                    name="category"
                    wrapperCol={{ span: 5 }}
                >
                    <Select defaultValue="default" disabled>
                        <Select.Option value="default">製作中...</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="內容"
                    name="content"
                    rules={[{ required: true, min: 1 }]}
                >
                    <Input.TextArea rows={4} placeholder="家裡誕生了新成員，想問大家都怎麼照顧幼犬的呢？" />
                </Form.Item>
            </Form>
            <Row className="row-input bottom" justify="end">
                <Col className="col-buttons" span={18} pull={3}>
                    <Button type="primary" onClick={() => form.submit()}>張貼</Button>
                    <Button type="primary"><Link to="/">取消</Link></Button>
                </Col>
            </Row>
        </div>
    );
};

export default AddDiscuss;
