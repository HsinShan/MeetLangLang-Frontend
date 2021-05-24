import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../assets/style/drawcards/haveNoPet.scss';

const NonePet = () => {
    const { t } = useTranslation();

    return (
        <div className="no-pet-message">
            <h4>{t('drawcards.no-pet')}</h4>
            <Link to = 'pet/add'>
                <Button shape="round" value="small" className="go-add-pet">{t('drawcards.add-pet')}</Button>
            </Link>
        </div>
    );
};

export default NonePet;
