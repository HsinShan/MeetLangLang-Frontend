import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InformationCard from '../../components/search/InformationCard';
import SearchForm from '../../components/search/Form.js';

function getState(url, setAnimal) {
    axios.get(url)
        .then((response) => {
            setAnimal(true);
            sessionStorage.setItem('data', JSON.stringify(response.data));
        });
}

function Search() {
    const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=500';
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        getState(url, setAnimal);
    }, [url]);

    let animaldata = sessionStorage.getItem('data');
    animaldata = JSON.parse(animaldata);

    return (
        <div>
            <SearchForm />
            <br></br>
            { !animal && (<h1> Loading Data... </h1>)}
            { animal && (<div>
                <InformationCard data={ animaldata }/>
            </div>)}
        </div>
    );
}
export default Search;
