import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Spin, Button } from 'antd';
import PetList from './petList';
import '../../assets/style/member/myPets.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function MyPets() {
    const { t } = useTranslation();
    const history = useHistory();
    const [pets, setPets] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getPets = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setPets(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPets(token);
    }, [history, t]);

    return (
        <div className="my-pets">
            <div className="add-pet">
                <Link to='pet/add'>
                    <Button>
                        {t('member.add-pets')}
                    </Button>
                </Link>
            </div>
            { isLoading && <Spin tip={t('member.loading')} /> }
            { !isLoading && pets.length === 0 && (
                <div className="no-result">
                    { t('member.no-pets') }
                </div>
            )}
            { !isLoading && pets.length !== 0 && <PetList pets={pets} /> }
        </div>
    );
}
export default MyPets;
