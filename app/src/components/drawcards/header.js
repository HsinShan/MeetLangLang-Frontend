import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/style/drawcards/haveNoPet.scss';
import cat from '../../assets/images/drawCardsCat.png';
import dog from '../../assets/images/drawCardsDog.png';

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className="draw-cards-header">
            <img className="cat" src={cat}></img>
            <span className="description">
                <div className="title">{t('drawcards.page-title')}</div>
                <div className="sub-title">{t('drawcards.title')}</div>
            </span>
            <img className="dog" src={dog}></img>
        </div>
    );
};

export default Header;
