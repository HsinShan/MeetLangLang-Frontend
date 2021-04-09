import Navbar from './navbar';
import UserHeader from './userHeader';
import Logo from '../../assets/images/logo.svg';

const Header = ({ isLogin, logout }) => (
    <div className="header">
        <div>
            <div className="logo">
                <h1>遇見浪浪</h1>
                <img src={Logo} alt="Logo" />
            </div>
        </div>
        <div className="container">
            <Navbar />
            <div className="sub-container">
                <UserHeader
                    isLogin={isLogin}
                    logout={logout}
                />
            </div>
        </div>
    </div>
);

export default Header;
