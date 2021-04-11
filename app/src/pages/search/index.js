import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Pagination } from 'antd';
import '../../assets/style/search/index.scss';
import Card from '../../components/search/card';
import SearchForm from '../../components/search/SearchForm';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Search() {
    const [animals, setAnimals] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalIndex, setAnimalIndex] = useState({
        start: 0,
        end: 15,
    });
    const cardPerPage = 15;

    const getAnimals = async () => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/animal/get`)
            .then((res) => {
                const { data } = res;
                setAnimals(data);
                sessionStorage.setItem('animalsData', JSON.stringify(data));
            })
            .catch((err) => {
                message.error('錯誤' + err);
            });
    };

    const changePage = (page) => {
        setCurrentPage(page);
        setAnimalIndex({
            start: (currentPage - 1) * cardPerPage,
            end: currentPage * cardPerPage,
        });
    };

    useEffect(() => {
        const animalsData = sessionStorage.getItem('animalsData') || '';
        if (animalsData) {
            setAnimals(animalsData);
        } else {
            getAnimals(setAnimals);
        }
    }, []);

    return (
        <div>
            <SearchForm />
            <br></br>
            { !animals ? (
                <h1> Loading Data... </h1>
            ) : (
                <>
                    <div className="card-block">
                        {
                            animals.slice(animalIndex.start, animalIndex.end)
                                .map((animal) => (
                                    <Card key={animal.animal_id} data={ animal }/>
                                ))
                        }
                    </div>
                    <Pagination defaultCurrent={1} pageSize={cardPerPage} total={animals.length} onChange={changePage}/>
                </>
            )}
        </div>
    );
}
export default Search;
