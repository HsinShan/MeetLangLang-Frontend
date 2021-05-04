import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../assets/style/discuss/detail.scss';

// use api
const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function DiscussDetail() {
    const { t } = useTranslation();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const uuidFromURL = params.get('uuid');
    const [discuss, setDiscuss] = useState(null);
    const getData = async () => {
        const { hostname } = window.location;
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

    return (
        <>
            { discuss !== null &&
                <Card title={discuss.title}>
                    <p className="author">{t('discuss.author')}：{discuss.author}</p>
                    <p className="date">{t('discuss.date')}：{discuss.date}</p>
                    <p className="contnet">{t('discuss.content')}：{discuss.content}</p>
                </Card>
            }
            { discuss === null && uuidFromURL === null && <div><Spin tip="Loading..." /></div>}
        </>
    );
}
export default DiscussDetail;
