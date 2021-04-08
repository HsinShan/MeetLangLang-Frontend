import React from 'react';
// import Cookies from 'universal-cookie';
import '../../assets/style/search/information-card.scss';

const pic = [];
const sex = [];
const age = [];
const kind = [];
const address = [];
// console.log('information card');
let data = sessionStorage.getItem('data');
data = JSON.parse(data);

// const i = Cookies.getItem('index');

function InformationCard() {
    for (let index = 0; index < 5; index += 1) {
        // pic.push(data[index].album_file);
        sex.push(data[index].animal_sex);
        age.push(data[index].animal_age);
        kind.push(data[index].animal_kind);
        address.push(data[index].shelter_address);
        if (data[index].album_file === '') {
            pic.push(' ');
        } else {
            age.push(data[index].album_file);
        }
        if (data[index].animal_age === '') {
            age.push(' ');
        } else {
            age.push(data[index].animal_age);
        }
    }
    console.log(sex[0]);
    return (
        <p src={ pic[10] }></p>,
        <div className="informationcard">
            <div className="infor">
                <div className="image"><img src={ pic[10] }></img></div>
                <p></p>
                <div className="title">性別
                </div><div className="data">{ sex[10] }
                </div>
                <p></p>
                <div className="title">年齡
                </div><div className="data">{ age[10] }
                </div>
                <p></p>
                <div className="title">品種
                </div><div className="data">{ kind[10] }
                </div>
                <p></p>
                <div className="title">所在地
                </div><div className="add">{ address[10] }
                </div>
            </div>
        </div>
    );
}

export default InformationCard;
