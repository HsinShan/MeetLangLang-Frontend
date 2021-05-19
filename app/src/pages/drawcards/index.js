import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import HavePet from '../../components/drawcards/havePet';
import NonePet from '../../components/drawcards/nonePet';
import Result from '../../components/drawcards/result';
import '../../assets/style/drawcards/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const DrawCards = ({ isLogin }) => {
    const { t } = useTranslation();
    const [drawCard, setDrawCard] = useState(false);
    const [havePets, setHavePets] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getPets = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setHavePets(data.length);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPets(token);
    }, [isLoading]);
    const setDraw = (drawState) => {
        setDrawCard(drawState);
        setIsLoading(false);
        return (
            <>
            </>
        );
    };

    return (
        <>
            { !isLogin && <div className="login">{t('drawcards.login')}</div> }
            { isLogin && havePets !== 0 && !isLoading && !drawCard && <div className="draw-card"><HavePet setDraw={setDraw} /></div> }
            { isLogin && havePets === 0 && !isLoading && !drawCard && <div className="draw-card"><NonePet /></div> }
            { isLogin && havePets !== 0 && !isLoading && drawCard && <Result/>}
        </>
    );
};

export default DrawCards;
