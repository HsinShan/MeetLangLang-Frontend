import { Link } from 'react-router-dom';
import { Card as AntdCard, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import DefaultImage from '../../assets/images/defaultImage.svg';
import '../../assets/style/shared/card.scss';

const Card = ({ data }) => {
    const { t } = useTranslation();
    const {
        animal_sex: sex,
        animal_kind: kind,
        animal_age: age,
        animal_area_pkid: area,
        album_file: image,
    } = data;

    const noData = t('card.none');

    return (
        <AntdCard>
            <div className="image">
                <img src={ image || DefaultImage } />
            </div>
            <div className="info">
                <p className="title">{ t('card.sex') }</p>
                <p className='data'>{ t('animal_sex', { returnObjects: true })[sex] || noData }</p>
            </div>
            <div className="info">
                <p className="title">{ t('card.age') }</p>
                <p className='data'>{ t('animal_age', { returnObjects: true })[age] || noData }</p>
            </div>
            <div className="info">
                <p className="title">{ t('card.kind') }</p>
                <p className='data'>{ t('animal_kind', { returnObjects: true })[kind] || noData }</p>
            </div>
            <div className="info">
                <p className="title">{t('card.area')}</p>
                <p className='data'>{ t('area', { returnObjects: true })[area && area.toString()] || noData }</p>
            </div>
            <Row justify="end">
                <Col>
                    <Link to={{
                        pathname: '/animalprofile',
                        state: {
                            animal: data,
                        },
                    }}>
                        {t('card.more')}
                    </Link>
                </Col>
            </Row>
        </AntdCard>
    );
};

export default Card;
