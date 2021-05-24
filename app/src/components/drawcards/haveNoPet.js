import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../assets/style/drawcards/haveNoPet.scss';

const NonePet = () => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className="no-pet-message">{t('drawcards.no-pet')}
                <Link to = 'pet/add'>
                    <Button shape="round" value="small" className="go-add-pet">{t('drawcards.add-pet')}</Button>
                </Link>
            </h4>
            <p></p>
            <div className="draw-card-button">
                <Button disabled shape="round" size="large" className="cannot-draw-card" icon={<MehOutlined />}>{t('drawcards.start')}</Button>
            </div>
        </>
    );
};

export default NonePet;
