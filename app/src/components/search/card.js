import { Link } from 'react-router-dom';
import { Card as AntdCard, Row, Col } from 'antd';
import DefaultImage from '../../assets/images/defaultImage.svg';
import '../../assets/style/search/card.scss';

const Card = ({ data }) => {
    const {
        animal_sex: sex,
        animal_kind: kind,
        animal_age: age,
        shelter_adders: area,
        album_file: image,
    } = data;

    const noData = '無';
    const formatSex = () => {
        if (sex === 'F') return '女生';
        if (sex === 'M') return '男生';
        return noData;
    };

    return (
        <AntdCard>
            <div className="image">
                <img src={ image || DefaultImage } />
            </div>
            <div className="info">
                <p className="title">性別</p>
                <p className='data'>{ formatSex() }</p>
            </div>
            <div className="info">
                <p className="title">年齡</p>
                <p className='data'>{ age || noData }</p>
            </div>
            <div className="info">
                <p className="title">品種</p>
                <p className='data'>{ kind || noData }</p>
            </div>
            <div className="info">
                <p className="title">所在地</p>
                <p className='data'>{ area || noData }</p>
            </div>
            <Row justify="end">
                <Col>
                    <Link to={{
                        pathname: '/animalprofile',
                        state: {
                            animal: data,
                        },
                    }}>
                        看更多
                    </Link>
                </Col>
            </Row>
        </AntdCard>
    );
};

export default Card;
