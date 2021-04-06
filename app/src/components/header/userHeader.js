import { Button } from 'antd';
import { Link } from 'react-router-dom';

const UserHeader = (props) => {
    const { isLogin, logout } = props;
    return (
        <>
            {(!isLogin) &&
                <Link to='/login'>
                    <Button >
                        Login
                    </Button>
                </Link>
            }
            {(isLogin) &&
                <Button onClick={() => logout()}>Logout</Button>
            }
        </>
    );
};

export default UserHeader;
