import React from 'react';
import { useTranslation } from 'react-i18next';
import PetForm from '../../components/pet/petForm';
import '../../assets/style/pet/index.scss';

const AddPet = () => {
    const { t } = useTranslation();
    return (
        <div className="pet-add">
            <div className="title">{t('petadd.title')}</div>
            <PetForm />
        </div>
    );
};
export default AddPet;
