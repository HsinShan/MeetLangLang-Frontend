import { Button, Input } from 'antd';
import { Component } from 'react';
import '../../assets/style/login/LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
        };
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
        return (
            <div className="login-form">
                <header className="login-form-title">會員{this.props.type}</header>
                <div className="account">
                    <p>
                        <label className="label">帳號</label>
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
                        <label className="label">密碼</label>
                        <Input
                            type="password"
                            className="password-text"
                            placeholder="Password"
                            onChange={(e) => this.GetPasswordValue(e)} />
                    </p>
                </div>
                <Button
                    className="loginform-button"
                    onClick={() => this.props.loginLogic(this.state.account)}>
                    {this.props.type}
                </Button>
            </div>
        );
    }
}

export default LoginForm;
