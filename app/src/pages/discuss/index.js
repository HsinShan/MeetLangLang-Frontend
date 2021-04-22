import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiscussTable from '../../components/discuss/discussTable';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Discuss() {
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
        <DiscussTable data={message} />
    );
}

export default Discuss;
