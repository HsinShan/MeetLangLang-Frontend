import { useTranslation } from 'react-i18next';

const DrawCards = () => {
    const { t } = useTranslation();
    return (
        <div className="draw-cards">{t('drawcards.building')}</div>
    );
};

export default DrawCards;
