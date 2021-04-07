import React from 'react';

export default class FetchData extends React.Component {
    async GetData() {
        console.log('fetch get data');
        const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
        const response = await fetch(url);
        const data = await response.json();
        console.log(this.response);
        console.log(data.length);
        console.log(data);
    }

    render() {
        this.GetData();
        return (
            <div>
                <h1>get data</h1>
            </div>
        );
    }
}
