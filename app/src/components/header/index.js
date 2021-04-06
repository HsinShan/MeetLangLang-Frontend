import Navbar from './navbar';
import UserHeader from './userHeader';

const Header = ({ isLogin, logout }) => (
    <div className="header">
        <div>
            <div className="logo">Meet Lang Lang</div>
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
