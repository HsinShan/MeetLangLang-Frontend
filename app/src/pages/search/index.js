import React from 'react';
import Informationcard from '../../components/search/InformationCard';
import Searchform from '../../components/search/form';
// import FetchData from '../../components/search/fetchData';
import '../../assets/style/search/index.scss';

function cardelements() {
    const elements = [];
    elements.push(< Informationcard />);
    // let i = 0;
    // for (i = 0; i < 5; i += 1) {
    //     elements.push(< Informationcard />);
    // }
    return elements;
}

// function fetchdata() {
//     <FetchData />;
// }

function search() {
    console.log('index search data');
    return (
        <div>
            <Searchform />
            <br></br>
            {/* {fetchdata()} */}
            <div className="row">{cardelements()}</div>
            {/* <div className="row">{cardelements()}</div> */}
            {/* <div className="row">{cardelements()}</div> */}
        </div>
    );
}
export default search;
