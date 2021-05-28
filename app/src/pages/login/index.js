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
    const loginLogic = async () => {};
    const fbLoginLogic = async (type, fbtoken = '') => {
        if (type === 'success') {
            const { hostname } = window.location;
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/user/fb-login`,
                method: 'post',
                data: {
                    accessToken: fbtoken,
                },
            });
            const { token, firstName, fullName } = data;
            message.success(t('login.success'));
            loggedin(token, firstName, fullName);
            history.push('/');
        } else {
            message.error(t('login.error'));
        }
    };

    return (
        <>
            <div className="login-page">
                <LoginForm
                    ssoOnly={true}
                    type='login'
                    description={t('login.description')}
                    loginLogic={(account) => loginLogic(account)}
                    fbLoginLogic={fbLoginLogic}
                />
            </div>
        </>
    );
};

export default Login;
