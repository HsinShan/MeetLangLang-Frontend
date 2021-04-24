import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Spin, message } from 'antd';
import Card from '../../components/shared/card';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const goToLoginPage = (history) => {
    history.push('/login');
};

function Member() {
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
        if (!token) {
            message.warning('請先登入');
            goToLoginPage(history);
        } else {
            getFavorites(token);
        }
    }, [history]);

    return (
        <>
            { isLoading && <Spin tip="加載中..." /> }
            { !isLoading && animals.length === 0 && (
                <div className="no-result"> 沒有收藏的寵物，快去
                    <Link to='/search' className='link'>領養浪浪</Link>
                    頁面看看吧
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
export default Member;
