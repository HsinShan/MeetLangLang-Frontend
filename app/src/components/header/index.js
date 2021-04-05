import Navbar from './navbar';
import UserHeader from './userHeader';

const Header = ({ isLogin, logout }) => (
    <div className="header">
        <div>
            <div className="logo">Meet Lang Lang</div>
            <UserHeader
                isLogin={isLogin}
                logout={logout}
            />
        </div>
        <Navbar />
    </div>
);

export default Header;
