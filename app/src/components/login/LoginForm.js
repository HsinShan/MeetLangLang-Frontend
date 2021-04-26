import {
    Button,
    Input,
    Row,
    Col,
} from 'antd';
import { FacebookFilled } from '@ant-design/icons';
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import '../../assets/style/login/LoginForm.scss';

const initFacebookSdk = () => {
    // facebook sdk to initialize
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: '3968724543170407',
            cookie: true,
            xfbml: true,
            version: 'v10.0',
        });
    };
    // load facebook sdk script
    /* eslint-disable */
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
        };
        initFacebookSdk();
    }

    GetAccountValue = (e) => {
        const account = e.target.value;
        this.setState({ account });
    }

    GetPasswordValue(e) {
        const password = e.target.value;
        this.setState({ password });
    }

    render() {
        const { type } = this.props;
        const { t } = this.props;
        return (
            <div className="login-form">
                <header className="login-form-title">{t('login.member')}{this.props.type}</header>
                <div className="account">
                    <p>
                        <label className="label">{t('login.username')}</label>
                        <Input
                            type="text"
                            className="accout-text"
                            placeholder="Username"
                            value={this.state.account}
                            onChange={(e) => this.GetAccountValue(e)} />
                    </p>
                </div>
                <div className="password">
                    <p>
                        <label className="label">{t('login.password')}</label>
                        <Input
                            type="password"
                            className="password-text"
                            placeholder="Password"
                            onChange={(e) => this.GetPasswordValue(e)} />
                    </p>
                </div>
                <div>
                    <Button
                        className="loginform-button"
                        onClick={() => this.props.loginLogic(this.state.account)}>
                        {type === 'login' && '登入'}
                        {type === 'register' && '註冊'}
                    </Button>
                </div>
                {type === 'login' &&
                    <Row align="center">
                        <Col>
                            <Button
                                className="loginform-fblogin-button"
                                block="true"
                                type="primary"
                                size="large"
                                icon={(<FacebookFilled />)}
                                onClick={() => {
                                    window.FB.login(() => {
                                        window.FB.getLoginStatus((res) => {
                                            if (res.status === 'connected') {
                                                this.props.fbLoginLogic('success', res.authResponse.accessToken);
                                            } else {
                                                this.props.fbLoginLogic('error');
                                            }
                                        });
                                    }, {
                                        scope: 'email',
                                    });
                                }}
                            >
                                <span>
                                    <b>Continue with Facebook</b><br />
                                    <small>we'll never post on your behalf</small>
                                </span>
                            </Button>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default withTranslation()(LoginForm);
