import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Informationcard from '../../components/search/InformationCard';
import Searchform from '../../components/search/form';
import '../../assets/style/search/index.scss';

function cardelements() {
    console.log('cardelements');
    const elements = [];
    let i = 0;
    for (i = 0; i < 5; i += 1) {
        elements.push(< Informationcard />);
    }
    return elements;
}

function Fetchdata() {
    console.log('fetch data');
    const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=500';
    const [animal, setAnimal] = useState(null);
    console.log(animal);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setAnimal(response.data);
                console.log(response);
                sessionStorage.setItem('data', JSON.stringify(response.data));
            });
    }, [url]);

    // if (animal) {
    //     return (
    //         <h1>{animal[0].animal_id}</h1>,
    //         <div></div>
    //     );
    // }
    // return (
    //     <div>
    //         no data
    //     </div>
    // );
}

function search() {
    console.log('index search data');
    return (
        <div>
            {Fetchdata()}
            <Searchform />
            <br></br>
            <div className="row">{cardelements()}</div>
            <div className="row">{cardelements()}</div>
            <div className="row">{cardelements()}</div>
        </div>
    );
}
export default search;
