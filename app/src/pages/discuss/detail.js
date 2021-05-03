import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Card } from 'antd';
import '../../assets/style/discuss/detail.scss';

// use api
const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function DiscussDetail() {
    const location = useLocation();
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    // 有無帶參數
    const searchURL = location.search;
    const bool = searchURL.indexOf('?');
    // 判斷uuid有沒有帶值
    if (!('search' in location) || !location.search) window.location.href = '/discuss';
    if (bool === '-1' || !location.search) window.location.href = '/discuss';
    // 取得uuid
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const uuidFromURL = params.get('uuid');
    const getData = async () => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/discuss/topic/detail/${uuidFromURL}`)
            .then((res) => {
                const { data } = res;
                setTitle(data[0].title);
                setContent(data[0].content);
            });
    };
    useEffect(() => {
        if (uuidFromURL && title === null && content === null) {
            getData();
        }
    });

    return (
        <>
            { title !== null && content !== null &&
                <Card title={title}>
                    <p>{content}</p>
                </Card>
            }
            { title === null && content === null && <p>error</p> }
        </>
    );
}
export default DiscussDetail;
