import '../../assets/style/search/informationCard.scss';

const InformationCard = (props) => {
    console.log(props.data);
    return (
        <p src={ props.data[0].album_file }></p>,
        <div className="informationcard">
            <div className="infor">
                <div className="image"><img src={ props.data[0].album_file }></img></div>
                <p></p>
                <div className="title">性別
                </div><div className="data">{ props.data[0].animal_sex }
                </div>
                <p></p>
                <div className="title">年齡
                </div><div className="data">{ props.data[0].animal_age }
                </div>
                <p></p>
                <div className="title">品種
                </div><div className="data">{ props.data[0].animal_kind }
                </div>
                <p></p>
                <div className="title">所在地
                </div><div className="add">{ props.data[0].shelter_addres }
                </div>
            </div>
        </div>
    );
};

export default InformationCard;
