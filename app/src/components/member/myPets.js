import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PetList from './petList';
import '../../assets/style/member/myPets.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function MyPets() {
    const { t } = useTranslation();
    const history = useHistory();
    const [pets, setPets] = useState(null); // processed animal data

    const getPets = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setPets(data);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPets(token);
    }, [history, t]);

    return (
        <div className="my-pets">
            { pets && <PetList pets={pets} /> }
        </div>
    );
}
export default MyPets;
