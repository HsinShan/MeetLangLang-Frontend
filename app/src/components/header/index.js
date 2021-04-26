import { useTranslation } from 'react-i18next';
import Navbar from './navbar';
import UserHeader from './userHeader';
import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogin, logout }) => {
    const { t } = useTranslation();
    return (
        <div className="header">
            <div className='header-top'>
                <div className="logo">
                    <h1>{t('header.title')}</h1>
                    <img src={Logo} alt="Logo" />
                </div>
                <UserHeader
                    isLogin={isLogin}
                    logout={logout}
                />
            </div>
            <Navbar />
        </div>
    );
};

export default Header;
