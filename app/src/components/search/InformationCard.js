import React from 'react';
// import Data from './fetchData';
import '../../assets/style/search/information-card.scss';

let d = {};
const id = [];
const sex = [];
const age = [];
const kind = [];
const place = [];
const image = [];

async function FetchData() {
    console.log('information card :fetch data');
    const url = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
async function GetData() {
    console.log('information card :get Data');
    d = await FetchData();
    for (let index = 0; index < d.length; index += 1) {
        id.push(d[index].animal_id);
        sex.push(d[index].animal_sex);
        age.push(d[index].animal_age);
        kind.push(d[index].animal_kind);
        place.push(d[index].animal_place);
        image.push(d[index].album_file);
    }
    console.log('id[0]:' + id[0]);
    return [id];
}

function InformationCard() {
    console.log('information card');
    d = GetData();
    return (
        <div className="informationcard">
            <div className="infor">
                <p className="pic"></p>
                <p className="title">性別</p>
                <p className="title">年齡</p>
                <p className="title">品種</p>
                <p className="title">所在地</p>
            </div>
        </div>
    );
}

export default InformationCard;
