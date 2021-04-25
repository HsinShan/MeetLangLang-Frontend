import { useTranslation } from 'react-i18next';

const Share = () => {
    const { t } = useTranslation();
    return (
        <div className="share">{t('share.building')}</div>
    );
};

export default Share;
