import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import defaultImg from '../../assets/images/defaultImage.svg';
import '../../assets/style/drawcards/result.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const Result = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [pet, setPet] = useState({});
    const [havePet, setHavePet] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async (token) => {
        const { hostname } = window.location;
        const { data } = await axios({
            method: 'post',
            url: `${apiProtocol}://${hostname}:${apiPort}/pet/draw`,
            headers: { token },
        });
        setPet(data);
        console.log(data);
        console.log(data.length);
        console.log(data.key);
        if (data.key === undefined) {
            setHavePet(false);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        getData(token);
    }, [history]);
    useEffect(() => {
        let timer1 = null;
        if (pet) {
            timer1 = setTimeout(() => setIsLoading(false), 500);
        }
        return () => {
            clearTimeout(timer1);
        };
    }, [pet]);
    const PetData = () => (
        <>
            { pet.petPhoto === null && <img className="pet-photo" src={defaultImg}></img>}
            { pet.petPhoto !== null && <img className="pet-photo" src={`https://images.weserv.nl/?url=${pet.petPhoto}`}></img>}
            <div className="pet-data">
                <div className="row"><div className="result-title">{t('drawcards.pet-name')}</div><div className="result-content">{pet.petName}</div></div>
                <div className="row"><div className="result-title">{t('drawcards.pet-kind')}</div><div className="result-content">{pet.petKind}</div></div>
                <div className="row"><div className="result-title">{t('drawcards.pet-sex')}</div><div className="result-content">{pet.petSex}</div></div>
                <div className="row"><div className="result-title">{t('drawcards.pet-age')}</div><div className="result-content">{pet.petAge}</div></div>
                <div className="row"><div className="result-title">{t('drawcards.pet-introduction')}</div><div className="result-content">{pet.petIntro}</div></div>
            </div>
        </>
    );
    const drawAgain = () => {
        const token = localStorage.getItem('token');
        getData(token);
    };
    const Again = () => (
        <Button className="result-button" shape="round" icon={<SyncOutlined />} onClick={() => drawAgain()}>{t('drawcards.again')}</Button>
    );
    return (
        <div className="result">
            { isLoading && <div><Spin tip="Loading..." /></div> }
            { !isLoading && !havePet && <div className="no-pet-data">{t('drawcards.donot-have-pet')}</div>}
            { !isLoading && havePet && <div className="all">{ <PetData/> }</div> }
            { !isLoading && havePet && <div className="again-button">{ <Again/> }</div>}
        </div>
    );
};

export default Result;
