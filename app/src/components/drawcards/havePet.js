import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import cat from '../../assets/images/drawCardsCat.png';
import dog from '../../assets/images/drawCardsDog.png';
import '../../assets/style/drawcards/havePet.scss';

const HavePet = ({ setDraw }) => {
    const { t } = useTranslation();
    const HeadImage = () => (
        <div className="img">
            <img className="cat" src={cat}></img>
            <img className="dog" src={dog}></img>
        </div>
    );
    const ShowMessage = () => (
        <>
            <h4 className="have-pet-message">{t('drawcards.have-pet')}
                <p>{t('drawcards.description')}</p>
            </h4>
            <div className="draw-card-button">
                <Button shape="round" size="large" className="start-draw-card" icon={<SmileOutlined /> } onClick={() => setDraw(true) }>{t('drawcards.start')}</Button>
            </div>
        </>
    );
    return (
        <>
            <HeadImage/>
            <ShowMessage/>
        </>
    );
};

export default HavePet;
