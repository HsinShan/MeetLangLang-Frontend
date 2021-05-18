import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import '../../assets/style/pet/result.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const Result = () => {
    const { t } = useTranslation();
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        console.log(isLoading);
        const token = localStorage.getItem('token');
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setPet(data[0]);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getData();
    }, []);
    const PetData = () => {
        console.log(typeof (pet));
        console.log(pet);
        return (
            <>
                <img className="pet-photo" src={`https://images.weserv.nl/?url=${pet.petPhoto}`}></img>
                <div className="pet-data">
                    <div className="row"><div className="result-title">{t('drawcards.pet-name')}</div><div className="result-content">{pet.petName}</div></div>
                    <div className="row"><div className="result-title">{t('drawcards.pet-kind')}</div><div className="result-content">{pet.petkind}</div></div>
                    <div className="row"><div className="result-title">{t('drawcards.pet-sex')}</div><div className="result-content">{pet.petSex}</div></div>
                    <div className="row"><div className="result-title">{t('drawcards.pet-age')}</div><div className="result-content">{pet.PetAge}</div></div>
                    <div className="row"><div className="result-title">{t('drawcards.pet-introduction')}</div><div className="result-content">{pet.petIntro}</div></div>
                </div>
            </>
        );
    };
    const Again = () => (
        <Button className="result-button" shape="round" icon={<SyncOutlined />} onClick={getData()}>{t('drawcards.again')}</Button>
    );
    return (
        <div className="result-content">
            { isLoading && <div><Spin tip="Loading..." /></div> }
            { !isLoading && <div className="all">{ <PetData/> }</div> && <div className="again-button">{ <Again/>}</div>}
            {/* <div className="all">
                { <PetData/> }
            </div>
            <div className="again-button">
                { <Again/> }
            </div> */}
        </div>
    );
};

export default Result;
