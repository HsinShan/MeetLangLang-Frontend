import { Button, Input } from 'antd';

const Login = () => (
    <div className="login-page">
        <div className="left-container">
            <div className="login-form">
                <header className="login-form-title">會員登入</header>
                <div className="account">
                    <p>
                        <label className="account-label">帳號</label>
                        <Input type="text" className="accout-text" id="accout-text" placeholder="Username" />
                    </p>
                </div>
                <div className="password">
                    <p>
                        <label className="password-label">密碼</label>
                        <Input type="password" className="password-text" id="password-text" placeholder="Password" />
                    </p>
                </div>
                <Button className="login-button">登入</Button>
            </div>
        </div>
        <div className="right-container">
            <div className="register-form">
                <header className="register-form-title">會員註冊</header>
                <div className="account">
                    <p>
                        <label className="account-label">帳號</label>
                        <Input type="text" className="accout-text" id="accout-text" placeholder="Username" />
                    </p>
                </div>
                <div className="password">
                    <p>
                        <label className="password-label">密碼</label>
                        <Input type="password" className="password-text" id="password-text" placeholder="Password" />
                    </p>
                </div>
                <Button className="register-button">註冊</Button>
            </div>
        </div>
    </div>
);

export default Login;
