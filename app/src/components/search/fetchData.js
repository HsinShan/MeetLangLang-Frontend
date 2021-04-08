import React, { useState, useEffect } from 'react';
import axios from 'axios';

// export default class FetchData extends React.Component {
//     async GetData() {
//         console.log('fetch get data');
//         const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=500';
//         const response = await fetch(url);
//         const jsondata = await response.json();
//         console.log(this.jsondata);
//         sessionStorage.setItem('jsondata', JSON.stringify(jsondata));
//     }

//     render() {
//         this.GetData();
//         return (
//             <div></div>
//         );
//     }
// }
function DataFetching() {
    const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=500';
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setAnimal(response.data);
                console.log(response);
                console.log(response.data);
                sessionStorage.setItem('data', JSON.stringify(response.data));
            });
    }, [url]);

    if (animal) {
        sessionStorage.setItem(animal);
        return (
            <div>
                <h1>{animal[0].animal_id}</h1>
            </div>
        );
    }

    return (
        <div>
            no data
        </div>
    );
}

export default DataFetching;
