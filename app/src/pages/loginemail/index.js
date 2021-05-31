import '../../assets/style/login/index.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../components/login/LoginForm';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const Login = ({ loggedin }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const loginLogic = async (account) => {
        try {
            const { hostname } = window.location;
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/user/login`,
                method: 'post',
                data: {
                    email: account,
                },
            });
            const { token, firstName, fullName } = data;
            message.success(t('login.success'));
            loggedin(token, firstName, fullName);
            history.push('/');
        } catch (err) {
            message.error(t('login.error'));
        }
    };
    const fbLoginLogic = async () => {};

    return (
        <>
            <div className="login-page">
                <div className="left-container">
                    <LoginForm
                        type='login'
                        loginLogic={(account) => loginLogic(account)}
                        fbLoginLogic={fbLoginLogic}
                    />
                </div>
                <div className="right-container">
                    <LoginForm type='register' loginLogic={(account) => loginLogic(account)} />
                </div>
            </div>
        </>
    );
};

export default Login;
