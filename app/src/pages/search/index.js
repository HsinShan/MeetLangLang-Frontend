import React from 'react';
import Informationcard from '../../components/search/InformationCard';
import Searchform from '../../components/search/form';
import '../../assets/style/search/index.scss';

function elements() {
    const elements = [];
    let i = 0;
    for (i = 0; i < 5; i += 1) {
        elements.push(< Informationcard />);
    }
    return elements;
}

function search() {
    return (
        <div>
            <Searchform />
            <br></br>
            <div className="row">{elements()}</div>
            <div className="row">{elements()}</div>
            <div className="row">{elements()}</div>
        </div>
    );
}
export default search;
