import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import InformationCard from '../../components/search/InformationCard';
import SearchForm from '../../components/search/SearchForm';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

function Search() {
    const [animals, setAnimals] = useState(null);

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
                animals.map((animal) => <InformationCard key={animal.animal_id} data={ animal }/>)
            )}
        </div>
    );
}
export default Search;
