import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import Header from '../../components/drawcards/header';
import HavePet from '../../components/drawcards/havePet';
import NonePet from '../../components/drawcards/haveNoPet';
import Result from '../../components/drawcards/result';
import '../../assets/style/drawcards/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const DrawCards = ({ isLogin }) => {
    const { t } = useTranslation();
    const { hostname } = window.location;
    const [drawCard, setDrawCard] = useState(false);
    const [canMatch, setCanMatch] = useState(true);
    const [havePets, setHavePets] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getPets = async (token) => {
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setHavePets(data.length);
                setIsLoading(false);
            });
    };

    const getMatchTime = async (token) => {
        const { data } = await axios({
            method: 'get',
            url: `${apiProtocol}://${hostname}:${apiPort}/match/time`,
            headers: { token },
        });
        if (data.time !== undefined) {
            const time = new Date(data.time);
            const now = new Date();
            if ((now - time) <= 86400000) {
                setCanMatch(false);
            }
        }
    };

    const addMatch = async (receiverId) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/match/add`,
                method: 'post',
                headers: { token },
                data: {
                    receiverId,
                },
            });
            const { success } = data;
            if (success) {
                message.success(t('drawcards.match-success'));
                setCanMatch(false);
            }
        } catch (err) {
            message.error(t('drawcards.match-failed'));
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getMatchTime(token);
        getPets(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setDraw = (drawState) => {
        setDrawCard(drawState);
        setIsLoading(false);
        return (
            <>
            </>
        );
    };

    return (
        <div className="draw-cards">
            <Header />
            { !isLogin && <div className="login">{t('drawcards.login')}</div> }
            { !canMatch && <div className="can-not-match">{t('drawcards.can-not-match')}</div>}
            { isLogin && havePets !== 0 && !isLoading && !drawCard && canMatch && <div className="draw-card"><HavePet setDraw={setDraw} /></div> }
            { isLogin && havePets === 0 && !isLoading && !drawCard && canMatch && <div className="draw-card"><NonePet /></div> }
            { isLogin && havePets !== 0 && !isLoading && drawCard && canMatch && <Result addMatch={addMatch}/>}
        </div>
    );
};

export default DrawCards;
