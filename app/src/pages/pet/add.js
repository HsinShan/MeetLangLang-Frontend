import React from 'react';
import { useTranslation } from 'react-i18next';
import PetForm from '../../components/pet/petForm';

const AddPet = () => {
    const { t } = useTranslation();
    return (
        <div>{t('petadd.pet-name')}</div>,
        <PetForm />
    );
};
export default AddPet;
