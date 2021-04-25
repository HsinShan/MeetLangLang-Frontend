import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    Select,
    message,
} from 'antd';
import axios from 'axios';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const AddDiscuss = ({ isLogin }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState('');
    const submit = async () => {
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
        <>
            {!isLogin &&
                <Redirect to="/" />
            }
            {redirect !== '' &&
                <Redirect to={redirect} />
            }
            <Row justify="center">
                <Col span={4}>
                    作者
                </Col>
                <Col span={16}>
                    製作中...
                </Col>
            </Row>
            <Row justify="center">
                <Col span={4}>
                    主題
                </Col>
                <Col span={16}>
                    <Input placeholder="大家都怎麼照顧幼犬的呢？" onChange={(e) => setTitle(e.target.value)} />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={4}>
                    類別
                </Col>
                <Col span={16}>
                    <Select defaultValue="default" disabled>
                        <Select.Option value="default">製作中...</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={4}>
                    內容
                </Col>
                <Col span={16}>
                    <Input.TextArea rows={4} placeholder="家裡誕生了新成員，想問大家都怎麼照顧幼犬的呢？" onChange={(e) => setContent(e.target.value)} />
                </Col>
            </Row>
            <Row justify="end">
                <Col span={20}>
                    <Button type="primary" onClick={() => submit()}>張貼</Button>
                    <Button type="primary"><Link to="/">取消</Link></Button>
                </Col>
            </Row>
        </>
    );
};

export default AddDiscuss;
