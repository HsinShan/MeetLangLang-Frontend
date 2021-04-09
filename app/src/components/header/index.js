import Navbar from './navbar';
import UserHeader from './userHeader';
import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogin, logout }) => (
    <div className="header">
        <div className='header-top'>
            <div className="logo">
                <h1>遇見浪浪</h1>
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

export default Header;
