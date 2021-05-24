import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import '../../assets/style/drawcards/havePet.scss';

const HavePet = ({ setDraw }) => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className="have-pet-message">{t('drawcards.have-pet')}
                <p>{t('drawcards.description')}</p>
            </h4>
            <div className="draw-card-button">
                <Button shape="round" size="large" className="start-draw-card" icon={<SmileOutlined /> } onClick={() => setDraw(true) }>{t('drawcards.start')}</Button>
            </div>
        </>
    );
};

export default HavePet;
