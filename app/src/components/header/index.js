import i18n from 'i18next';
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
                <div className='right-section'>
                    <div className='language'>
                        <label className='language-label' onClick={() => { i18n.changeLanguage('zh-TW'); }}> 繁體中文 </label>
                        <label> | </label>
                        <label className='language-label' onClick={() => { i18n.changeLanguage('en'); }}> English </label>
                    </div>
                    <UserHeader
                        isLogin={isLogin}
                        logout={logout}
                    />
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Header;
