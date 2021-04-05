import React from 'react';
import Informationcard from '../../components/search/index';
import Searchform from '../../components/search/form';
import '../../assets/style/page/search/index.scss';

function createelements() {
    const elements = [];
    let i = 0;
    let j = 0;
    for (i = 0; i < 3; i += 1) {
        elements.push([]);
        for (j = 0; j < 5; j += 1) {
            elements[i].push(<Informationcard />);
        }
    }
    return elements;
}

function output() {
    return (
        <div>
            <Searchform />
            <div className="row">{createelements()}</div>
            <div className="row">{createelements()}</div>
            <div className="row">{createelements()}</div>
        </div>
    );
}
export default output;
