import { Button } from 'antd';

const Login = ({ isLogin, loggedin }) => {
    const loginLogic = () => {
        // You should call login api and get token here.
        const token = 'example-token';
        loggedin(token);
    };
    return (
        <>
            {isLogin &&
                <div className="login">You already logged in.</div>
            }
            {!isLogin &&
                <Button onClick={() => loginLogic()}>
                    Example login
                </Button>
            }
        </>
    );
};

export default Login;
