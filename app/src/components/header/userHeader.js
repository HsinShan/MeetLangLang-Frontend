import { Button } from 'antd';
import { Link } from 'react-router-dom';

const UserHeader = (props) => {
    const { isLogin, logout } = props;
    return (
        <>
            {(!isLogin) &&
                <Link to='/login'>
                    <Button >
                        登入
                    </Button>
                </Link>
            }
            {(isLogin) &&
                <Button onClick={() => logout()}>登出</Button>
            }
        </>
    );
};

export default UserHeader;
