import React from 'react';
import Informationcard from '../../components/search/InformationCard';
import Searchform from '../../components/search/form';
import '../../assets/style/search/index.scss';

function createElements() {
    const elements = [];
    let i = 0;
    for (i = 0; i < 5; i += 1) {
        elements.push(< Informationcard />);
    }
    return elements;
}

function output() {
    return (
        <div>
            <Searchform />
            <div className="row">{createElements()}</div>
            <div className="row">{createElements()}</div>
            <div className="row">{createElements()}</div>
        </div>
    );
}
export default output;
