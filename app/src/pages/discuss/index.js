import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DiscussTable from '../../components/discuss/discussTable';
import '../../assets/style/discuss/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Discuss() {
    const { t } = useTranslation();
    const [message, setMessage] = useState(null);

    const getData = async () => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/discuss/topic/list`)
            .then((res) => {
                const { data } = res;
                setMessage(data);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Link to='/adddiscuss'>
                <Button className='add-discuss'>
                    {t('discuss.add-discuss')}
                </Button>
            </Link>
            <DiscussTable className='discuss-table' data={message} />
        </>
    );
}

export default Discuss;
