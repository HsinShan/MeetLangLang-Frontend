import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Pagination, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../assets/style/search/index.scss';
import Card from '../../components/shared/card';
import SelectForm from '../../components/search/selectForm';
import SortBlock from '../../components/search/sortBlock';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Search() {
    const { t } = useTranslation();
    const [animals, setAnimals] = useState(null); // processed animal data
    const [originAnimals, setOriginAnimals] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState({
        page: 1,
        startIndex: 0,
        endIndex: 15,
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
        setCurrentPage({
            page,
            startIndex: (page - 1) * cardPerPage,
            endIndex: page * cardPerPage,
        });
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const getFilterOptions = (filterOptions) => {
        setLoading(true);
        const filters = _.pickBy(filterOptions, _.identity);
        const filteredData = _.filter(originAnimals, filters);
        setAnimals(filteredData);
    };

    const getSortOptions = (sortOptions) => {
        setLoading(true);
        const sortedData = _.orderBy(animals, [sortOptions], ['desc']);
        setAnimals(sortedData);
    };

    useEffect(() => {
        const animalData = sessionStorage.getItem('animalData');
        if (animalData) {
            setAnimals(JSON.parse(animalData));
            setOriginAnimals(JSON.parse(animalData));
        } else {
            getAnimals();
        }
    }, []);

    useEffect(() => {
        let timer1 = null;
        if (animals) {
            timer1 = setTimeout(() => setLoading(false), 100);
        }
        return () => {
            clearTimeout(timer1);
        };
    }, [animals]);

    return (
        <>
            <SelectForm data={originAnimals} getFilterOptions={getFilterOptions} />
            <SortBlock getSortOptions={getSortOptions} />
            { isLoading && <Spin tip={t('search.loading')} /> }
            { !isLoading && animals.length === 0 && (
                <div className="no-result">{t('search.text')}</div>
            )}
            { !isLoading && animals.length !== 0 && (
                <>
                    <div className="card-block">
                        {
                            animals.slice(currentPage.startIndex, currentPage.endIndex)
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
