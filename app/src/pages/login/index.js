import '../../assets/style/login/index.scss';
import axios from 'axios';
import { message } from 'antd';
import LoginForm from '../../components/login/LoginForm';

const Login = ({ isLogin, loggedin }) => {
    const loginLogic = async (account) => {
        try {
            const { hostname } = window.location;
            const { data } = await axios({
                url: `http://${hostname}:8181/user/login`,
                method: 'post',
                data: {
                    email: account,
                },
            });
            const { token } = data;
            loggedin(token);
        } catch (err) {
            message.error('登入失敗');
        }
    };
    return (
        <>
            {isLogin &&
                <div className="login">You already logged in.</div>
            }
            {!isLogin &&
                <div className="login-page">
                    <div className="left-container">
                        <LoginForm type='登入' loginLogic={(account) => loginLogic(account)} />
                    </div>
                    <div className="right-container">
                        <LoginForm type='註冊' loginLogic={(account) => loginLogic(account)} />
                    </div>
                </div>
            }
        </>
    );
};

export default Login;
