import React from 'react';
import { useTranslation } from 'react-i18next';

const AddPet = () => {
    const { t } = useTranslation();
    return (
        <div className="draw-cards">{t('drawcards.building')}</div>
    );
};
export default AddPet;
