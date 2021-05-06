import '../../assets/style/login/index.scss';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../components/login/LoginForm';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const Login = ({ isLogin, loggedin }) => {
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
            const { token } = data;
            message.success(t('login.success'));
            loggedin(token);
            history.push('/');
        } catch (err) {
            message.error(t('login.error'));
        }
    };
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
            const { token, firstName } = data;
            message.success(t('login.success'));
            loggedin(token, firstName);
            history.push('/');
        } else {
            message.error(t('login.error'));
        }
    };

    useEffect(() => {
        if (isLogin) {
            message.warning(t('login.already-login'));
            history.push('/');
        }
    }, [isLogin, history, t]);

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
