import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import Card from '../shared/card';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function MyFavorites() {
    const { t } = useTranslation();
    const history = useHistory();
    const [animals, setAnimals] = useState(null); // processed animal data
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalIndex, setAnimalIndex] = useState({
        start: 0,
        end: 15,
    });
    const cardPerPage = 15;

    const getFavorites = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/animal/favorites`, {
            headers: { token },
        })
            .then((res) => {
                const { animalInfo } = res.data;
                setAnimals(animalInfo);
                setLoading(false);
            });
    };

    const changePage = (page) => {
        setCurrentPage(page);
        setAnimalIndex({
            start: (currentPage - 1) * cardPerPage,
            end: currentPage * cardPerPage,
        });
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getFavorites(token);
    }, [history, t]);

    return (
        <>
            { isLoading && <Spin tip={t('member.loading')} /> }
            { !isLoading && animals.length === 0 && (
                <div className="no-result">{t('member.text.0')}
                    <Link to='/search' className='link'>{t('member.text.1')}</Link>
                    {t('member.text.2')}
                </div>
            )}
            { !isLoading && animals.length !== 0 && (
                <>
                    <div className="card-block">
                        {
                            animals.slice(animalIndex.start, animalIndex.end)
                                .map((animal) => (
                                    <Card key={animal.animal_id} data={ animal }/>
                                ))
                        }
                    </div>
                    {<Pagination defaultCurrent={1} pageSize={cardPerPage} total={animals.length} onChange={changePage}/>}
                </>
            )}
        </>
    );
}
export default MyFavorites;
