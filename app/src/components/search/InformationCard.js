import '../../assets/style/search/informationCard.scss';

const InformationCard = ({ data }) => {
    const {
        animal_sex: sex,
        animal_kind: kind,
        animal_age: age,
        shelter_adders: area,
        album_file: image,
    } = data;

    return (
        <div className="informationcard">
            <div className="infor">
                <div className="image"><img src={ image }></img></div>
                <p></p>
                <div className="title">性別</div>
                <div className="data">{ sex }</div>
                <p></p>
                <div className="title">年齡</div>
                <div className="data">{ age }</div>
                <p></p>
                <div className="title">品種</div>
                <div className="data">{ kind }</div>
                <p></p>
                <div className="title">所在地</div>
                <div className="add">{ area }</div>
            </div>
        </div>
    );
};

export default InformationCard;
