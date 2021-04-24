import { Link } from 'react-router-dom';
import { Card as AntdCard, Row, Col } from 'antd';
import DefaultImage from '../../assets/images/defaultImage.svg';
import '../../assets/style/shared/card.scss';
import { AREA, ANIMAL_AGE, ANIMAL_SEX } from '../../constants';

const Card = ({ data }) => {
    const {
        animal_sex: sex,
        animal_kind: kind,
        animal_age: age,
        animal_area_pkid: area,
        album_file: image,
    } = data;

    const noData = '無';

    return (
        <AntdCard>
            <div className="image">
                <img src={ image || DefaultImage } />
            </div>
            <div className="info">
                <p className="title">性別</p>
                <p className='data'>{ ANIMAL_SEX[sex] || noData }</p>
            </div>
            <div className="info">
                <p className="title">年齡</p>
                <p className='data'>{ ANIMAL_AGE[age] || noData }</p>
            </div>
            <div className="info">
                <p className="title">品種</p>
                <p className='data'>{ kind || noData }</p>
            </div>
            <div className="info">
                <p className="title">所在地</p>
                <p className='data'>{ AREA[area && area.toString()] || noData }</p>
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
