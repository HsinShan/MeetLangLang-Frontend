import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Pagination, Spin } from 'antd';
import '../../assets/style/search/index.scss';
import Card from '../../components/search/card';
import SelectForm from '../../components/search/selectForm';
import SortBlock from '../../components/search/sortBlock';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Search() {
    const [animals, setAnimals] = useState(null); // processed animal data
    const [originAnimals, setOriginAnimals] = useState(null);
    const [isLoading, setLoading] = useState(true);
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
                sessionStorage.setItem('animalData', JSON.stringify(data));
                setAnimals(data);
                setOriginAnimals(data);
            });
    };

    const changePage = (page) => {
        setCurrentPage(page);
        setAnimalIndex({
            start: (currentPage - 1) * cardPerPage,
            end: currentPage * cardPerPage,
        });
    };

    const getFilterOptions = (filterOptions) => {
        setLoading(true);
        const filters = _.pickBy(filterOptions, _.identity);
        const filteredData = _.filter(originAnimals, filters);
        setAnimals(filteredData);
    };

    useEffect(() => {
        const animalData = sessionStorage.getItem('animalData');
        if (animalData) {
            setAnimals(JSON.parse(animalData));
            setOriginAnimals(JSON.parse(animalData));
        } else {
            getAnimals(setAnimals);
        }
    }, []);

    useEffect(() => {
        if (animals) setLoading(false);
    }, [animals]);

    return (
        <>
            <SelectForm data={originAnimals} getFilterOptions={getFilterOptions} />
            <SortBlock />
            { isLoading && <Spin tip="加載中..." /> }
            { !isLoading && animals.length === 0 && (
                <div className="no-result"> 沒有符合條件的毛小孩！！ 請重新選擇條件...</div>
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
                    <Pagination defaultCurrent={1} pageSize={cardPerPage} total={animals.length} onChange={changePage}/>
                </>
            )}
        </>
    );
}
export default Search;
