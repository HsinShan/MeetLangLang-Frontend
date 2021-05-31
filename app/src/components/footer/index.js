import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../assets/style/footer/index.scss';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer>
            Meet Lang Lang © <Link to="/privacy">{t('footer.privacypolicy')}</Link>
        </footer>
    );
};

export default Footer;
